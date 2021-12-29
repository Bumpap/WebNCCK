$(document).ready(function () {

    var page = 1;
    const limit = 10;

    function getPosts() {
        fetch('/posts/list/page/' + page + '/limit/' + limit).then(response => {
            if (response.status !== 200) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return;
            }

            response.json().then(data => {
                for (let i = 0; i < data.length; i++) {
                    var temp = document.getElementsByTagName("template")[0];
                    var clone = temp.content.cloneNode(true);
                    var cardbody = clone.querySelector(".card-body");
                    cardbody.setAttribute('id', data[i]._id);
                    var nameEl = clone.querySelector("#display-name");
                    nameEl.innerHTML = data[i].creator;
                    var statusEl = clone.querySelector("#user-status");
                    statusEl.innerHTML = data[i].content;
                    var deleteBtn = clone.querySelector("#delete");
                    deleteBtn.setAttribute('data-id', data[i]._id);
                    var editBtn = clone.querySelector("#edit");
                    editBtn.setAttribute('data-id',data[i]._id);
                    
                    
                    var datetimeEl = clone.querySelector("#datetime");
                    datetimeEl.innerHTML = data[i].created_at;
    
                    document.getElementById('status').appendChild(clone)
                }
            })
        })
    }

    getPosts();
    console.log("Page " + page);


    window.onscroll = () => {
        var loadpage = (document.documentElement.scrollTop + window.innerHeight) === document.documentElement.offsetHeight;
        if (loadpage) {
            page = page + 1;
            console.log("Page " + page);
            getPosts();
        }
    }

    var socket = io();
    socket.on('post message', function (data) {
        insertPost(data.username, data.message, data.datetime);
    });
    function insertPost(username, message, datetime, avatar) {
        var temp = document.getElementsByTagName("template")[0];
        var clone = temp.content.cloneNode(true);
        var nameEl = clone.querySelector("#display-name");
        nameEl.innerHTML = username;
        var datetimeEl = clone.querySelector("#datetime");
        datetimeEl.innerHTML = datetime;
        var statusEl = clone.querySelector("#user-status");
        statusEl.innerHTML = message;
        document.getElementById('status').prepend(clone);
    }

    document.getElementById("postBtn").onclick = function (e) {
        e.preventDefault();
        var a = document.getElementById('content').value
        console.log(a)
        let data = {
            content: document.getElementById('content').value,
        }
        if (a == '') {
            alert("Null");
        }

        else
            fetch('./posts/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)

            })
                .then(response => {
                    if (response.status !== 200) {
                        console.log("Have A problem: " + response.status);
                        return;
                    }
                    response.json().then(function (data) {
                        if (data.success == 'true') {
                            let username = document.getElementById('username').innerHTML;
                            let message = document.getElementById('content').value;
                            let avatar = document.getElementById('avatar').innerHTML;
                            //var image = document.getElementById('customFile').value;
                            var datetime = new Date().toLocaleString().replace(",", "").replace("/:.. /", " "); //Sửa ngày giờ lại nha thầy
                            insertPost(username, message, datetime, avatar);
                            //emit data after post 
                            socket.emit('post message', { username: username, message: message, datetime: datetime, avatar: avatar });
                            document.getElementById('content').value = '';
                        } else {
                            console.log("error")
                        }
                    })
                })
    }
})
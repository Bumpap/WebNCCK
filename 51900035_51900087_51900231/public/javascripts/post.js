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
                    var avtEL = clone.querySelector("#avt_post");
                    avtEL.src = data[i].avatar;
                    var statusEl = clone.querySelector("#user-status");
                    statusEl.innerHTML = data[i].content;
                    // var deleteBtn = clone.querySelector("#delete");
                    // deleteBtn.setAttribute('data-id', data[i]._id);
                    // var editBtn = clone.querySelector("#edit");
                    // editBtn.setAttribute('data-id', data[i]._id);
                    var datetimeEl = clone.querySelector("#datetime");
                    var date = new Date(data[i].created_at)
                    datetimeEl.innerHTML = date.toUTCString()
                    document.getElementById('status').appendChild(clone)
                }
            })
        })
    }

    getPosts();
    // console.log("Page " + page);


    window.onscroll = () => {
        var loadpage = (document.documentElement.scrollTop + window.innerHeight) === document.documentElement.offsetHeight;
        if (loadpage) {
            page = page + 1;
            //console.log("Page " + page);
            getPosts();
        }
    }

    var socket = io();
    socket.on('post message', function (data) {
        insertPost(data.username, data.avatar, data.message, data.datetime);
    });
    function insertPost(username, message, datetime, avatar) {
        var temp = document.getElementsByTagName("template")[0];
        var clone = temp.content.cloneNode(true);
        var nameEl = clone.querySelector("#display-name");
        var avtEL = clone.querySelector("#avt_post");
        avtEL.src = avatar;
        nameEl.innerHTML = username;
        var datetimeEl = clone.querySelector("#datetime");
        datetimeEl.innerHTML = datetime.toUTCString();
        var statusEl = clone.querySelector("#user-status");
        statusEl.innerHTML = message;
        document.getElementById('status').prepend(clone);
    }

    document.getElementById("postBtn").onclick = function (e) {
        e.preventDefault();
        var a = document.getElementById('content').value
        let data = {
            content: document.getElementById('content').value,
            creator: document.getElementById('username').innerHTML,
            avatar: document.getElementById('avatar').src
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
                            let avatar = document.getElementById('avatar').src;
                            var datetime = new Date(new Date());
                            datetime.toUTCString();
                            console.log(datetime);
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
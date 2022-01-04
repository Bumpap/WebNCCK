$(document).ready(function () {

    function getPosts() {
        fetch('/comments/list').then(response => {
            if (response.status !== 200) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return;
            }
            response.json().then(data => {
                for (let i = 0; i < data.length; i++) {
                    var temp = document.getElementsByTagName("template")[2];
                    var clone = temp.content.cloneNode(true);
                    var cardbody = clone.querySelector(".form-control");
                    cardbody.setAttribute('id', data[i]._id);
                    var nameCmt = clone.querySelector("#comment-name");
                    nameCmt.innerHTML = data[i].creator;
                    //console.log(username)
                    var avtCmt = clone.querySelector("#avatarcmt");
                    avtCmt.src = data[i].avatar;
                    var contentCmt = clone.querySelector("#user-comments");
                    contentCmt.innerHTML = data[i].content;
                    //console.log(username)
                    var date_time = clone.querySelector("#date-time");
                    var date = new Date(data[i].created_at);
                    date_time.innerHTML = date.toUTCString()
                    // console.log(date)
                    document.getElementById('cmt').prepend(clone);
                }
            })
        })
    }

    getPosts();

    document.getElementById("commentBtn").onclick = function (e) {
        e.preventDefault();
        var a = document.getElementById('user-status-comment').value
        let data = {
            // id_post: ,
            content: document.getElementById('user-status-comment').value,
            creator: document.getElementById('username').innerHTML,
            avatar: document.getElementById('avatar').src
        }
        if (a == '') {
            alert("Null");
        }

        else
            fetch('./comments/create', {
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
                            let comment = document.getElementById('user-status-comment').value;
                            let avatar = document.getElementById('avatar').src;

                            //emit data after post 
                            var temp = document.getElementsByTagName("template")[2];
                            var clone = temp.content.cloneNode(true);
                            var nameCmt = clone.querySelector("#comment-name");
                            nameCmt.innerHTML = username;
                            var avtCmt = clone.querySelector("#avatarcmt");
                            avtCmt.src = avatar;
                            var contentCmt = clone.querySelector("#user-comments");
                            contentCmt.innerHTML = comment;
                            var date_time = clone.querySelector("#date-time");
                            var date = new Date(new Date());
                            date_time.innerHTML = date.toUTCString()
                            // console.log(date)
                            //console.log(document.getElementById('user-status-comment').value)
                            document.getElementById('cmt').prepend(clone);
                            document.getElementById('user-status-comment').value = '';

                        } else {
                            console.log("error")
                        }
                    })
                })
    }
})
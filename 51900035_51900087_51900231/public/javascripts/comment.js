$(document).ready(function () {
    var socket = io();
    socket.on('comment message', function (data) {
        insertComment(data.username, data.message, data.datetime);
    });
    function insertComment(username, message, datetime, avatar) {
        var temp = document.getElementsByTagName("template")[0];
        var clone = temp.content.cloneNode(true);
        var nameEl = clone.querySelector("#comment-name");
        nameEl.innerHTML = username;
        var datetimeEl = clone.querySelector("#date-time");
        datetimeEl.innerHTML = datetime;
        var commentsEl = clone.querySelector("#user-comments");
        commentsEl.innerHTML = message;
        document.getElementById('cmt').prepend(clone);
    }
    document.getElementById("commentBtn").onclick = function (e) {
        e.preventDefault();
        var a = document.getElementById('user-status-comment').value
        let data = {
            comment: document.getElementById('user-status-comment').value,
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
                            let message = document.getElementById('comment').value;
                            let avatar = document.getElementById('avatar').innerHTML;
                            //var image = document.getElementById('customFile').value;
                            var datetime = new Date().toLocaleString().replace(",", "").replace("/:.. /", " ");
                            insertComment(username, message, datetime, avatar);
                            //emit data after post 
                            socket.emit('comment message', { username: username, message: message, datetime: datetime, avatar: avatar });
                            document.getElementById('user-status-comment').value = '';
                        } else {
                            console.log("error")
                        }
                    })
                })
    }




})
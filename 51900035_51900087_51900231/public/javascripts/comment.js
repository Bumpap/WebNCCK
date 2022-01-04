$(document).ready(function () {
    // var socket = io();
    // socket.on('comment message', function (data) {
    //     insertComment(data.username, data.message, data.datetime);
    // });
    // function insertComment(username, message, datetime, avatar) {
    //     var temp = document.getElementsByTagName("template")[0];
    //     var clone = temp.content.cloneNode(true);
    //     var nameEl = clone.querySelector("#comment-name");
    //     nameEl.innerHTML = username;
    //     var datetimeEl = clone.querySelector("#date-time");
    //     datetimeEl.innerHTML = datetime;
    //     var commentsEl = clone.querySelector("#user-comments");
    //     commentsEl.innerHTML = message;
    //     document.getElementById('cmt').prepend(clone);
    // }
    document.getElementById("commentBtn").onclick = function (e) {
        e.preventDefault();
        var a = document.getElementById('user-status-comment').value
        let data = {
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
                            //var image = document.getElementById('customFile').value;
                            // var datetime = new Date().toLocaleString().replace(",", "").replace("/:.. /", " ");
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
                            console.log(document.getElementById('user-status-comment').value)
                            document.getElementById('cmt').prepend(clone);
                            document.getElementById('user-status-comment').value = '';
                            
                        } else {
                            console.log("error")
                        }
                    })
                })
    }




})
$(document).ready(function () {



    var socket = io();

    socket.on('post message', function (data) {
        insertPost(data.username, data.message, data.datetime);
    });
    function insertPost(username, message, datetime) {
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
                            var datetime = new Date().toLocaleString().replace(",", "").replace("/:.. /", " ");

                            insertPost(username, message, datetime);
                            //emit data after post 
                            socket.emit('post message', { username: username, message: message, datetime: datetime });
                            document.getElementById('content').value = '';

                        } else {
                            console.log("error")
                        }
                    })
                })

    }
})
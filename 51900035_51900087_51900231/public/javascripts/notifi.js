$(document).ready(function () {

    var socket = io();
    socket.on('notifi message', function (data) {
        var temp = document.getElementsByTagName("template")[1];
        var clone = temp.content.cloneNode(true);
        var notifToast = clone.querySelector("#notifToast");
        notifToast.innerHTML = data.username + " đã đăng một thông báo mới!";
        document.getElementById('notifi').prepend(clone);

    });
    document.getElementById("notifiBtn").onclick = function (e) {
        e.preventDefault();
        var a = document.getElementById('contentNoti').value
        let data = {
            // id_post: ,
            content: document.getElementById('contentNoti').value,
            creator: document.getElementById('username').innerHTML,
            avatar: document.getElementById('avatar').src
        }
        console.log(data);
        if (a == '') {
            alert("Null");
        }

        else
            fetch('./notifis/create', {
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
                            var temp = document.getElementsByTagName("template")[1];
                            var clone = temp.content.cloneNode(true);
                            var notifToast = clone.querySelector("#notifToast");
                            notifToast.innerHTML = username + " đã đăng một thông báo mới!";
                            document.getElementById('notifi').prepend(clone);
                            socket.emit('notifi message', { username: username });
                            document.getElementById('contentNoti').value = '';

                        } else {
                            console.log("error")
                        }
                    })
                })
    }




})
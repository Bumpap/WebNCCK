$(document).ready(function () {

    //post notification

    // function insertNoti(username, message, datetime, avatar) {
    //     var temp = document.getElementsByTagName("template")[1];
    //     var clone = temp.content.cloneNode(true);
    //     var nameNoti = clone.querySelector("#card-creator");
    //     nameNoti.innerHTML = username;
    //     var datetimeNoti = clone.querySelector("#card-datetime");
    //     datetimeNoti.innerHTML = datetime;
    //     var statusNoti = clone.querySelector("#card-content");
    //     statusNoti.innerHTML = message;
    //     document.getElementById('statusNoti').prepend(clone);
    // }

    document.getElementById("postNotiBtn").onclick = function (e) {
        e.preventDefault();
        var a = document.getElementById('contentNotif').value
        //console.log(a)
        let data = {
            content: document.getElementById('contentNotif').value,
            //creator: document.getElementById('username').value
        }
        if (a == '') {
            alert("Null");
        }

        else
            fetch('./notifi/create', {
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
                            let message = document.getElementById('contentNotif').value;
                            var datetime = new Date().toLocaleString().replace(",", "").replace("/:.. /", " ");
                            // insertNoti(username, message, datetime);
                            //socket.emit('post message', { username: username, message: message, datetime: datetime, avatar: avatar });
                            //console.log(username, message, datetime)
                            var temp = document.getElementsByTagName("template")[1];
                            var clone = temp.content.cloneNode(true);
                            var nameNoti = clone.querySelector("#card-creator");
                            nameNoti.innerHTML = username;
                            console.log(username)
                            // console.log(nameNoti)
                            // var datetimeNoti = clone.querySelector("#card-datetime");
                            // datetimeNoti.innerText = datetime;
                            // var statusNoti = clone.querySelector("#card-content");
                            // statusNoti.innerText = message;
                            // document.getElementById('statusNoti').prepend(clone);
                            document.getElementById('contentNotif').value = '';
                        } else {
                            //document.getElementById('contentNotif').value = '';
                            console.log("error")
                        }
                    })
                })
    }
})
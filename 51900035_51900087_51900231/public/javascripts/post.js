$(document).ready(function () {

    var page = 1;
    const limit = 5;

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
                    // var datetimeEl = clone.querySelector("#datetime");
                    // datetimeEl.innerHTML = data[i].created_at;

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


    //  document.getElementById("edit").onclick = function (e) {
    //     e.preventDefault();

    //         fetch('./posts/create', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(data)

    //         })
    //             .then(response => {
    //                 if (response.status !== 200) {
    //                     console.log("Have A problem: " + response.status);
    //                     return;
    //                 }
    //                 response.json().then(function (data) {
    //                     if (data.success == 'true') {
    //                         let a = document.getElementById('user-status').innerHTML;

    //                         var editStatus = document.getElementById("user-status-edit")
    //                         editStatus.innerHTML = a;
    //                         console.log("innerhtml post: " +a);
    //                         console.log("innerhtml edit "+ editStatus.innerHTML);

    //                     } else {
    //                         console.log("error")
    //                     }
    //                 })
    //             })
    //      }

    // $("body").on("click","#delete",(event)=>{
    //     event.preventDefault();
    //     let id = $(event.target).data("id");

    //     $.ajax({
    //         url: "/deletePostBtn",
    //         method: "POST",
    //         contentType: "application/json",
    //         data: JSON.stringify({id: id}),
    //         success: function (res) {
    //             let div = document.getElementById(res.id);
    //              div.remove();
    //         }

    //     })



    // })






    //  document.getElementById("editBtn").onclick = function (e) {
    //     e.preventDefault();
    //     var a = document.getElementById('content').value
    //     let data = {
    //         content: document.getElementById('content').value,
    //     }
    //     if (a == '') {
    //         alert("Null");
    //     }

    //     else
    //         fetch('./posts/create', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(data)

    //         })
    //             .then(response => {
    //                 if (response.status !== 200) {
    //                     console.log("Have A problem: " + response.status);
    //                     return;
    //                 }
    //                 response.json().then(function (data) {
    //                     if (data.success == 'true') {
    //                         let username = document.getElementById('username').innerHTML;
    //                         let message = document.getElementById('content').value;
    //                         let avatar = document.getElementById('avatar').innerHTML;
    //                         //var image = document.getElementById('customFile').value;
    //                         var datetime = new Date().toLocaleString().replace(",", "").replace("/:.. /", " "); //Sửa ngày giờ lại nha thầy
    //                         insertPost(username, message, datetime, avatar);
    //                         //emit data after post 
    //                         socket.emit('post message', { username: username, message: message, datetime: datetime, avatar: avatar });
    //                         document.getElementById('content').value = '';
    //                     } else {
    //                         console.log("error")
    //                     }
    //                 })
    //             })
    //      }


})
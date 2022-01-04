$(document).ready(function () {
    $("#btn_Submit").on("submit", function (event) {
        event.preventDefault();
        let khoa = $("khoa").val();
        let lop = $("#lop").val();
        let name = $("#fullname").val();
        let email = $("#eMail").val();
        let avatar = $('#user-avatar').attr('src');
        $.ajax({
            url: "/profile",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ khoa: khoa, lop: lop, name: name, email: email, avatar: avatar }),
            success: function (res) {
                $('#khoa').val() = khoa;
                $("#lop").val() = lop;
                $("#fullname").val() = name;
                $("#eMail").val() = email;
                $('#user-avatar').attr('src') = avatar;
            }

        })
    })

    $("#btn_changePWD").on("submit", function (event) {
        event.preventDefault();
        let newPWD = $("newPWD").val();

        $.ajax({
            url: "/changePWD",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ password: newPWD }),
            success: function (res) {
                $("newPWD").val() = newPWD;
            }

        })
    })

    $("body").on("click", "#delete", (event) => {
        event.preventDefault();
        let id = $(event.target).data("id");

        $.ajax({
            url: "/deletePostBtn",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ id: id }),
            success: function (res) {
                console.log(res);
                let div = document.getElementById(res);
                console.log(div);
                div.remove();
            }

        })
    })


    $("body").on("click", "#deleteNotifi", (event) => {
        event.preventDefault();
        let id = $(event.target).data("id");

        $.ajax({
            url: "/deleteNotifi",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ id: id }),
            success: function (res) {
                console.log(res);
                let div = document.getElementById(res);
                console.log(div);
                div.remove();
            }

        })
    })

    $("body").on("click", "#edit", (event) => {
        event.preventDefault();
        let id = $(event.target).data("id");
        let savePost = document.getElementById("editBtn");
        savePost.setAttribute('data-id', id);

        $.ajax({
            url: "/editPostBtn",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ id: id }),
            success: function (res) {
                let a = document.getElementById(res);
                let b = a.querySelector("#" + "user-status").innerHTML;
                document.getElementById("user-status-edit").innerHTML = b;
                console.log(b);
                console.log(id);
            }

        })
    })

    $("body").on("click", "#editBtn", (event) => {
        event.preventDefault();
        let id = $(event.target).data("id");
        let user_edit = document.getElementById("user-status-edit").value;

        $.ajax({
            url: "/saveEdit",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ id: id, content: user_edit }),
            success: function (res) {
                console.log(res);
            }

        })
    })

})
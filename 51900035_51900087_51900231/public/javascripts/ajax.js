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

})
$(document).ready(function () {




    
    document.getElementById("postBtn").onclick = function (e) {
        e.preventDefault();
        var a = document.getElementById('content').value
        let data = {
            content: document.getElementById('content').value,
            creator: "Tester"
        }

        if (a == '')
        {
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
                        var temp = document.getElementsByTagName("template")[0];
                        var clone = temp.content.cloneNode(true);
                        var nameEl = clone.querySelector("#display-name");
                        nameEl.innerHTML = "Tester";
                        var datetime = new Date().toLocaleString().replace(",","").replace("/:.. /"," ");
                        var datetimeEl = clone.querySelector("#datetime");
                        datetimeEl.innerHTML = datetime;
                        var statusEl = clone.querySelector("#user-status");
                        statusEl.innerHTML = document.getElementById('content').value;

                        document.getElementById('status').prepend(clone);


                        document.getElementById('content').value ='';

                        

                    } else {
                        console.log("error")
                    }
                })
            })
        
    }
})
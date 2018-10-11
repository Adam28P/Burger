$(function () {
    $(".updateBtn").on("click", function (event) {
        event.preventDefault();
        var id = $(this).attr("data-id");

        var devouredState = {
            devoured: true,
            id: id
        };

        // Send the PUT request.
        $.ajax("/api/burgers/update", {
            type: "POST",
            data: devouredState
        }).then(
            function () {
                console.log("Burger updated");
            }
        );
        // Reload the page to get the updated list
        location.reload();
    });

    $("#createBtn").on("click", function (event) {

        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var burgerTitle = $("#burgerName").val().trim();
        if (burgerTitle != "") {
            var newBurger = {
                name: $("#burgerName").val().trim(),
                devoured: false
            };
            console.log(newBurger);
            // Send the POST request.
            $.ajax("/api/burgers/create", {
                type: "POST",
                data: newBurger
            }).then(
                function () {
                    console.log("created new burger");
                    // Reload the page to get the updated list
                    location.reload();
                }
            );
        } else {
           alert("Burger Name field cannot be empty!");
        }
    });
});
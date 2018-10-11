var express = require("express");

var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Import the model to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        console.log(data);
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers/create", function (req, res) {
    console.log("Here is the request:");
    console.log(req.body);
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.name, false
    ], function () {
        res.redirect("/");
    });
});

router.post("/api/burgers/update", function (req, res) {
    console.log("Here is the request:");
    console.log(req.body);
    var condition = "id = " + req.body.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: 1
    }, condition, function () {
        console.log("updated");
    });
});

// Export routes for server.js to use.
module.exports = router;
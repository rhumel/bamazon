// import packages into file
var inquirer = require("inquirer");
var mysql = require("mysql");

// //deifine variables for posting new auction item
// var postItem = "";
// var postCategory = "";
// var postBid = "";

// make connection to sql
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "greatBay_DB"
});
// call initial prompts to start 
initialPromts();

function initialPromts(){
    var optionsArray =[
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
    ]
    inquirer
        .prompt({
            name: "options",
            type: "rawlist",
            message: "Would you like to [POST] an auction or [BID] on an auction?",
            choices: optionsArray
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            // if (answer.options.toUpperCase() === "POST") {
            //     postAuction();
            // }
            // else {
            //     bidAuction();
            // }
        })
    }

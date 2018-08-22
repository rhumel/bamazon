// import packages into file
var inquirer = require("inquirer");
var mysql = require("mysql");
//var bamazonCustomer = require("./bamazonCustomer.js")


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
            message: "Please make your selection",
            choices: optionsArray
        })
        .then(function (answer) {
            // Select function based on answer
            switch (options) {
                case "View Products for Sale":
                    displayProducts();
                    break;
            
                // case "View Low Inventory":
                //     lowInventory();
                //     break;
            
                // case "Add to Inventory":
                //     addInventory();
                //     break;
            
                // case "Add New Product":
                //     addProduct();
                //     break;
            }
            // if (answer.options === "View Products for Sale") {
            //     displayProducts();
            // }
            // // else {
            // //     bidAuction();
            // // }
        })
    }

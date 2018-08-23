// import packages into file
var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require('easy-table');

// make connection to sql
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});
// call initial prompts to start 
initialPromts();

function initialPromts(){
    var optionsArray =[
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Quit?"
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
            switch (answer.options) {
                case "View Products for Sale":
                    console.log("display product function");
                    displayProducts();
                    initialPromts();
                    break;
            
                case "View Low Inventory":
                    lowInventory();
                    break;
            
                case "Add to Inventory":
                    addInventory();
                    break;
            
                // case "Add New Product":
                //     addProduct();
                //     break;

                case "Quit":
                    connect.end();
                    break;

            }
            
        })
    }

    // Display the Products in bamazon database
function displayProducts() {

    // get categories for post
    console.log("Selecting all Available Items...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) {
            console.log(err);
            throw err;
        } else {
            // used for the easy-table package
            var t = new Table;

            // // Log all results of the SELECT statement
            res.forEach((productList, i) => {
                // t.cell is used for easy-table set-up
                t.cell('Product Id', productList.id)
                t.cell('Department Name',productList.department_name)
                t.cell('Description', productList.product_name)
                t.cell('Price',productList.customer_price,Table.number(2))
                t.cell('Quantity', productList.quantity)
                t.newRow()

            })
            console.log(t.toString());
            // initialPromts();  

        }
    // console.log(query.sql);    
    }
    )
};

function addInventory() {
    // Call display so the Manager can see what is available
        
    //    displayProducts();

    // get categories for post
    inquirer
    .prompt([
        {
            name: "itemNumber",
            type: "input",
            message: "What is the number of the item you wish to increase the inventory?"
        },
        {
            name: "purchaseQuantity",
            type: "input",
            message: "How many units should be added to inventory?"
        }

    ])

    .then(function (answer) {
        //
        // Create and run QUERY to find the Item # of the product
        //
        var itemNumber = answer.itemNumber;
        var quantity = answer.purchaseQuantity;
        console.log(itemNumber);
        console.log(quantity);

        // Select the item from the db and get the db quantity
        connection.query(
            "SELECT * from products WHERE ?",
            {
                id: itemNumber
            },
            function (err, res) {
                if (err) {
                    console.log(err)
                } else {
                    // get the new quantity to update the DB
                    console.log(res[0].quantity);
                    var prodQuant = parseInt(quantity) + parseInt(res[0].quantity);
                    var product = res[0].product_name;
                    // use the quantity and run SQL statement
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                          {
                            quantity: prodQuant
                          },
                      
                          {
                            id: itemNumber
                          }
                        ],
                        function (err, res) {
                            if (err) {
                                console.log(err)
                            } else {
                                // Check the User qty against DB.  If insufficient, send user mesg
                                console.log("The inventory for "+ product +" has been increased to "+ prodQuant+".");
                                }
            
                            }
                    )}
                }
        )
      })   


// function addInventory() {

//     // get categories for post
//     console.log("Selecting all Available Items to add ...\n");
//     connection.query("SELECT * FROM products", function (err, res) {
//         if (err) {
//             console.log(err);
//             throw err;
//         } else {
//             // used for the easy-table package
//             var t = new Table;

//             // // Log all results of the SELECT statement
//             res.forEach((productList, i) => {
//                 // t.cell is used for easy-table set-up
//                 t.cell('Product Id', productList.id)
//                 t.cell('Department Name',productList.department_name)
//                 t.cell('Description', productList.product_name)
//                 t.cell('Price',productList.customer_price,Table.number(2))
//                 t.cell('Quantity', productList.quantity)
//                 t.newRow()

//             })
//             console.log(t.toString());
//             initialPromts();  
    }

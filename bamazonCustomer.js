// import packages into file
var inquirer = require("inquirer");
var mysql = require("mysql");

//deifine variables for posting new auction item
var postItem = "";
var postCategory = "";
var postBid = "";

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


displayProducts();

// Display the Products in bamazon database
//
function displayProducts() {
    var ItemArray = [];

    // get categories for post
    console.log("Selecting all Available Items...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) {
            console.log(err);
            throw err;
        } else {
            console.log("---------------------------Auction List----------------------------------");
            console.log("  No.     Product         Department      Price        Quantity          ");
            console.log("_________________________________________________________________________");
            // Log all results of the SELECT statement
            res.forEach((productList, i) => {

                console.log(" " + productList.id + "     " + productList.product_name + "         " + productList.department_name + "           " + productList.customer_price + "     " + productList.quantity);

            })
            //console.log(res);
            // call initial prompts to start 
            initialPromts();
           
        }
    }
    )
};

//    prompts used for purchase
function initialPromts() {
inquirer
    .prompt([
        {
            name: "itemNumber",
            type: "input",
            message: "What is the number of the item you wish to buy?"
        },
        {
            name: "purchaseQuantity",
            type: "input",
            message: "How many do you want to buy?"
        }

    ])

    .then(function (answer) {
        // based on their answer, either call the bid or the post functions
        var itemNumber = answer.itemNumber;
        var quantity = answer.purchaseQuantity;
        console.log(itemNumber);
        console.log(quantity);


        var query = connection.query(
            "SELECT * from products WHERE ?",
            {
                id: itemNumber
            },
            function (err, res) {
                //  console.log(res.affectedRows + " auction item inserted!\n");
                if (err) {
                    console.log(err)
                } else {
                   
                    if (quantity > res[0].quantity) {
                        console.log("Sorry, it appears that we only have " + res[0].quantity +" of the " + res[0].product_name); //+ " auction item Selected\n"); 
                        connection.end();
                    } else {
                        quantity = res[0].quantity - quantity;
                        updateQuantity(itemNumber, quantity);
                    }

                }

            }

        )
      
    });


}

function updateQuantity(itemNumber,prodQuant) {
    console.log("Updating all quantities...\n");
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          quantity: prodQuant
        },
    
        {
          id: itemNumber
        }
      ],
      function(err, res) {
        console.log("Thank you for you purchase!!!\n");
        connection.end();
      }
    );
  
    // logs the actual query being run
    // console.log(query.sql);
    
  }
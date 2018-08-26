//  import packages into file
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


displayProducts();


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
                t.cell('Product Sales', productList.product_sales)
                t.newRow()

            })
            console.log(t.toString());
           
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
        //
        // Create and run QUERY to find the Item # of the product
        //
        var itemNumber = answer.itemNumber;
        var quantity = answer.purchaseQuantity;
        // console.log(itemNumber);
        // console.log(quantity);


        var query = connection.query(
            "SELECT * from products WHERE ?",
            {
                id: itemNumber
            },
            function (err, res) {
                if (err) {
                    console.log(err)
                } else {
                    // Check the User qty against DB.  If insufficient, send user mesg
                    if (quantity > res[0].quantity) {
                        console.log("Sorry, it appears that we only have " + res[0].quantity +" of the " + res[0].product_name); //+ " auction item Selected\n"); 
                        connection.end();
                    } else {
                        //subtract USER qty from db and cal fnct to update the db and to display totaal costs
                        var totalSales = parseInt(res[0].product_sales);
                        remainQuantity = res[0].quantity - quantity;
                        price = res[0].customer_price;
                        updateQuantity(itemNumber, remainQuantity);
                        totalPurchase(price,quantity,totalSales,itemNumber);
                    }

                }

            }

        )
      
    });


}

function updateQuantity(itemNumber,prodQuant) {
   
    console.log("Updating all quantities...\n");
   
    //update the QTY in the product table for the item number
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
        console.log("Thank you for your purchase!!!\n");
        connection.end();
      }
    );
  
    // logs the actual query being run
    // console.log(query.sql);
    
  }

   //called when the purchase is made to display total 
  function totalPurchase(price,quantity,totalSales,itemNumber) {
    //   console.log (price +" " + quantity);

    
    var totalCost = (price * quantity);
    var totalSales = (parseInt(totalSales) + parseInt(totalCost));

    console.log("Your total cost is $" + totalCost);

        // Update the product sales
        connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    product_sales: totalSales
                },
                {
                    id: itemNumber
                }
            ],
            function (err, res) {
                if (err) {
                    console.log(err)
                } else {
                   console.log("Product sales updated");
                }

            }
        )
  };
 
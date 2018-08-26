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

function initialPromts(cb) {
    var optionsArray = [
        "View Product Sales by Department",
        "Create New Department",
        "Quit"        
    ];
    inquirer
        .prompt({
            name: "options",
            type: "rawlist",
            message: "Please make your selection",
            choices: optionsArray
        })
        .then(function (answer) {
            if (answer.options==="View Product Sales by Department") {
                connection.query( "select  departments.department_id,departments.department_name,departments.over_head_costs,sum(products.product_sales) as product_sales,(sum(products.product_sales) - departments.over_head_costs) as total_profit from departments inner join products on departments.department_name = products.department_name group by products.department_name", function (err, res) {
                    if (err) {
                        console.log(err);
                        throw err;
                    } else {
                        // used for the easy-table package
                        var t = new Table;
            
                        // // Log all results of the SELECT statement
                        res.forEach((departmentList, i) => {
                            //t.cell is used for easy-table set-up
                            t.cell('Department Id', departmentList.department_id)
                            t.cell('Department Name', departmentList.department_name)
                            t.cell('Over Head Costs', departmentList.over_head_costs)
                            t.cell('Product Sales', departmentList.product_sales)
                            t.cell('Total Profit', departmentList.total_profit)
                            t.newRow()
                            console.log(departmentList);
                        })
                        console.log(t.toString());
                        cb();
                    }
                })


            } else {
                inquirer
                .prompt([
                    {
                        name: "newDept",
                        type: "input",
                        message: "Enter new DEPARTMENT name."
                    },
                    {
                        name: "overHead",
                        type: "input",
                        message: "What are the overhead cost associated with the new Department?"
                    }
                ])
        
                .then(function (answer) {
                    //
                    // Create and run QUERY to ADD a new product to DB
                    //
                    connection.query(
                        "INSERT INTO departments SET ?",
                        {
                            department_name: answer.newDept,
                            over_head_costs: answer.overHead
                        },
                        function (err, res) {
                            if (err) {
                                console.log(err)
                            } else {
                                // DIsplay the updated table
                               // cb();
                            console.log(answer.newDept+" updated in Department Database");
                            cb();    
                        }

        
                        }
                    )
                })
         
            }
   } 
)}; 
 

# Bamazon

## Overview

Welcome to BAMAZON!!  This application will allow customers to buy items that are available on our site.  It is also allows both the manager and supervisor, to manipulate inventory levels, add new products and departments, as well as track sales and profits.

## About Bamazon

Bamazon is a node.js application, that is run on the terminal.  Because of this, each user must do a few things to get this running properly.  This application requires installing a few npm packages.
* Inquirer - Allows for the prompts required to answer questions
* MySQL - Allows the Application to have access to, and modify database and tables
* Easy-Table - Formats the information retreived from database.
        
Install these packages by running the following commands:
      npm i iquirer
      npm i mysql
      npm i easy-table

### Run Bamazon

To run the application, you decide which module you need.  Run the appropriate command in the command line of terminal.
       
       node bamazonCustomer.js
       node bamazonManager.js
       node bamazonSupervisor.js
       
### bamazonCustomer.js

#### Cusomer mode has a couple of functions.  

###### 1. Display available inventory

<img width="960" alt="display products" src="https://user-images.githubusercontent.com/38961938/44629602-c17bda80-a91f-11e8-9329-111856b9b33f.png">

###### 2.Choose the iventory item, and quantity.

<img width="960" alt="display total cost of purcahse" src="https://user-images.githubusercontent.com/38961938/44629701-0e13e580-a921-11e8-8b25-97434b8f6039.png">

### bamazonManager.js

#### Manager view has a few functions; 
*View products list
*View Low Inventory
*Add to Inventory
*Add to new product
*Quit

##### 1.  Display the Products List

<img width="960" alt="view products and low inventory" src="https://user-images.githubusercontent.com/38961938/44630436-b9c23300-a92b-11e8-91bc-e5293f5bdcd8.png">


##### 2.  Display low inventory (5 or less) 
  
  ###### Display low inventory.  Then **UPDATE** the inventory to increase quantity.
        
<img width="960" alt="low inventory" src="https://user-images.githubusercontent.com/38961938/44630736-7c13d900-a930-11e8-86d6-f480c6fcc257.png">

##### 3. Add new Product and Quit.


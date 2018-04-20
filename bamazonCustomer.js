let mysql = require("mysql");
let inquirer = require("inquirer");
let connection = mysql.createConnection({
	host: "localhost",
	port: 8889,
	user: "root",
	password: "root",
	database: "bamazon"
});

connection.connect(function(err){
	if (err) throw err;
	// console.log("connected as id " + connection.threadId);
	shopMode();
});

function shopMode(){
	displayAll();
	inquirer.prompt(
	[
	{
		type: "input",
		message: "Type ID of item you want to purchase \n",
		name: "item"
	},
	{
		type: "input",
		message: "How many items?",
		name: "amount"
	}
	])
	.then(function(answer){
		var itemRequest = answer.item;
		connection.query(
			"UPDATE products SET ? WHERE ?",
			[{
				requested: answer.amount
			},
			{
				item_id: itemRequest
			}],
			function(err, res){
				if (err) throw err;
			});
		connection.query(
			"SELECT stock_quantity, requested, price FROM products WHERE ?",
			{
				item_id: itemRequest
			},
			function(err, res) {
				var inStock = res[0].stock_quantity;
				request = res[0].requested;
				price = res[0].price;
				newStock = inStock - request;
				if (err) {
					console.log("Error message is " + err)
				} else if (inStock < request)
				{
					console.log("Insufficient amount!");
					return shopMode();
				} else {
					var purchase = request * price;
					console.log(`There are ${inStock} left. \n Your total is ${purchase} USD`);
				};
			});
		connection.query(	
			"UPDATE products SET stock_quantity=stock_quantity-requested WHERE ?",
			{
				item_id: itemRequest
			}
			,function(err, res){
			// if (err) throw err;
			// console.log(`New quantity is ${res[0].stock_quantity}`)
		});	
	});
};

function displayAll () {
	connection.query(
		"SELECT item_id, product_name, price FROM products",
		function(err, res) {
			for (i in res) {
				console.log(`${res[i].product_name} with ID of ${res[i].item_id} is available for ${res[i].price} USD \n`)
			};
	});
};

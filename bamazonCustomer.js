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
	console.log("connected as id " + connection.threadId);
	shopMode();
});

function shopMode(){
	inquirer.prompt(
	[
	{
		type: "input",
		message: "Type ID of item you want to purchase",
		name: "item"
	},
	{
		type: "input",
		message: "How many items?",
		name: "amount"
	}
	])
	.then(function(answer){
		connection.query(
			"UPDATE products SET ? WHERE ?",
			[{
				requested: answer.amount
			},
			{
				item_id: answer.item
			}],
			function(err, res){
				if (err) throw err;
			});
		connection.query(
			"SELECT stock_quantity, requested FROM products WHERE ?",
			{
				item_id: answer.item
			},
			function(err, res) {
				if (err) {
					console.log("Error message is " + err)
				} else if (res[0].stock_quantity < res[0].requested)
				{
					console.log("Insufficient amount!")
				} else {
					console.log(`There are ${res[0].stock_quantity} left`);
				}
			});
	});
};

// function amount(){
// 	connection.query(
// 		"UPDATE products SET ? WHERE ?",
// 		[{
// 			requested: answer.amount
// 		},
// 		{
// 			item_id: answer.item
// 		}],
// 		function(err, res){
// 			if (err) throw err;
// 		});
// };

// function readDB () {
// 	connection.query(
// 		"SELECT stock_quantity FROM products WHERE ?",
// 		{
// 			item_id: answer.item
// 		},
// 		function(err, res) {
// 			if (err) throw err;
// 			console.log(`There are ${res[0].stock_quantity} left`)
// 		});
// };




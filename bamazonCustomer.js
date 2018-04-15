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
	console.log(`Connection is: ${connection.threadID}`);
});

function readDB () {
	connection.query("SELECT ? FROM products WHERE ?",
		{
		stock_quantity: answer.amount,
		item_id: answer.item
		},
		function(err, res) {
			if (err) throw err;
			console.log(res);
			connection.end();
		});
};

function shopMode(){
	inquirer.prompt(
	{
		type: "input",
		message: "Type ID of item you want to purchase",
		name: "item"
	},
	{
		type: "input",
		message: "How many items?"
		name: "amount"
	}
	).then(function(answer){
		readDB();
	})
};
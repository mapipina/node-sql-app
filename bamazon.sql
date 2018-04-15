CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id int NOT NULL,
	product_name varchar(100),
	department_name varchar(100),
	price decimal (10,2),
	stock_quantity int,
	primary key(item_id)
);
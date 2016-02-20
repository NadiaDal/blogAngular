<?php
// a simple database connection function - returns a mysqli connection object
function connect_db() {
	$server = '127.0.0.1'; // e.g 'localhost' or '192.168.1.100'
	$user = 'root';
	$pass = '';
	$database = 'blog';
	$connection = new mysqli($server, $user, $pass, $database);



	return $connection;
}
//function connect_db() {
//	$server = '127.10.51.2:3306'; // e.g 'localhost' or '192.168.1.100'
//	$user = 'adminWXtfYeC';
//	$pass = 'fhf_tYXSP349';
//	$database = 'blog';
//	$connection = new mysqli($server, $user, $pass, $database);
//
//
//
//	return $connection;
//}
?>


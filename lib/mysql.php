<?php
// a simple database connection function - returns a mysqli connection object
function connect_db() {
	$server = 'http://my-homesweethome.rhcloud.com/'; // e.g 'localhost' or '192.168.1.100'
	$user = 'adminWXtfYeC';
	$pass = 'fhf_tYXSP349';
	$database = 'blog';
	$connection = new mysqli($server, $user, $pass, $database);

	return $connection;
}


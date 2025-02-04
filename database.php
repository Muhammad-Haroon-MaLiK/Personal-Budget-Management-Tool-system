<?php
$host = "localhost";
$username = "root";  // Change if needed
$password = "";      // Your MySQL password
$dbname = "budget_db";  // Database name

// Create the connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check for connection errors
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

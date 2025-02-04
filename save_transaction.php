<?php
$servername = "localhost";
$username = "root"; // Change if necessary
$password = ""; // Change if necessary
$dbname = "budget_db"; // Make sure this matches your actual database

// Connect to database
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$amount = $_POST['amount'];
$frequency = $_POST['frequency'];
$type = $_POST['type'];
$category = isset($_POST['category']) ? $_POST['category'] : NULL;

// Insert into database
$sql = "INSERT INTO transactions (amount, frequency, type, category) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("dsss", $amount, $frequency, $type, $category);

if ($stmt->execute()) {
    echo "Transaction saved successfully.";
} else {
    echo "Error: " . $conn->error;
}

$stmt->close();
$conn->close();

// Redirect back to the main page
header("Location: project.php");
exit();
?>

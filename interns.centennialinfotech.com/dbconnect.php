<?php
// db.php
$host = 'localhost';  // Database host (usually 'localhost')
$username = 'pankaj';   // Database username
$password = 'C!RiP1}Z40X1DaTab123';       // Database password
$database = 'centennialdb'; // Database name
try {
    // Create PDO instance
    $dsn = "mysql:host=$host;dbname=$database;charset=utf8";
    $pdo = new PDO($dsn, $username, $password);

    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // If connection fails, show the error message
    die("Connection failed: " . $e->getMessage());
}
?>

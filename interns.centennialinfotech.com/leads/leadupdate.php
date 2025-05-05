<?php 

include '../dbconnect.php'; // Include the database connection
header('Content-Type: application/json'); // Set the content type to JSON for the response

try {
    // Check if the required fields are set in the POST request
    if (isset($_POST['name'], $_POST['email'], $_POST['phone'], $_POST['address'])) {
        // Collect form data
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $phone = htmlspecialchars($_POST['phone']);
        echo $address = htmlspecialchars($_POST['address']);
        $joblinknssid = htmlspecialchars($_POST['joblinknss']);
        $jobid = htmlspecialchars($_POST['jobid']);
        /* Select to check existing record */


        $selectstmt = $pdo->prepare("Select * from leadupdate WHERE name = :name AND email = :email AND  phone = :phone AND joblinknssid = :joblinknssid");

        $selectstmt->bindParam(':name', $name , PDO::PARAM_STR);
        $selectstmt->bindParam(':email', $email , PDO::PARAM_STR);
        $selectstmt->bindParam(':phone', $phone , PDO::PARAM_STR);
        //$selectstmt->bindParam(':address', $address , PDO::PARAM_STR);
        //$selectstmt->bindParam(':jobid', $jobid , PDO::PARAM_STR);
        $selectstmt->bindParam(':joblinknssid', $joblinknssid , PDO::PARAM_INT);
        $selectstmt->execute();
       if ($selectstmt->rowCount() === 0) {

    
        

        // Prepare the SQL query to insert data into the database
        $stmt = $pdo->prepare("INSERT INTO leadupdate (name, email, phone, address, joblinknssid) VALUES (:name, :email, :phone, :address, :joblinknssid)");

        // Bind parameters to prevent SQL injection
        $stmt->bindParam(':name', $name , PDO::PARAM_STR);
        $stmt->bindParam(':email', $email , PDO::PARAM_STR);
        $stmt->bindParam(':phone', $phone , PDO::PARAM_STR);
        $stmt->bindParam(':address', $address , PDO::PARAM_STR);
        //$stmt->bindParam(':jobid', $jobid , PDO::PARAM_STR);
        $stmt->bindParam(':joblinknssid', $joblinknssid , PDO::PARAM_INT);

        // Try to execute the query
        if ($stmt->execute()) {
            // Return a success response in JSON format
            $message = "Record inserted";
     header("Location: ../applicantdetail.php?message=" . urlencode($message));
        } else {
            // If query execution fails, return an error response
            echo json_encode([
                'success' => false,
                'message' => 'Error inserting data into the database.'
            ]);
        }
    }else{
        $message = "Record already existed";
     header("Location: ../applicantdetail.php?message=" . urlencode($message));
    }
    } else {
        // If required fields are missing, return an error response
        echo json_encode([
            'success' => false,
            'message' => 'Missing required form data.'
        ]);
    }

} catch (PDOException $e) {
    // If a database error occurs, return the error message in JSON format
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}

/*
include '../dbconnect.php'; // Include the database connection
header('Content-Type: application/json'); // Set the content type to JSON for the response

try {
    // Check if the required fields are set in the POST request
    if (isset($_POST['name'], $_POST['email'], $_POST['phone'], $_POST['address'])) {
        // Collect form data
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $phone = htmlspecialchars($_POST['phone']);
        $address = htmlspecialchars($_POST['address']);

        // Prepare the SQL query to insert data into the database
        $stmt = $pdo->prepare("INSERT INTO leadupdate (name, email, phone, address) VALUES (:name, :email, :phone, :address)");

        // Bind parameters to prevent SQL injection
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':address', $address);

        // Try to execute the query
        if ($stmt->execute()) {
            // Return a success response in JSON format
            echo json_encode([
                'success' => true,
                'message' => 'Data successfully inserted into the database!'
            ]);
        } else {
            // If query execution fails, return an error response
            echo json_encode([
                'success' => false,
                'message' => 'Error inserting data into the database.'
            ]);
        }
    } else {
        // If required fields are missing, return an error response
        echo json_encode([
            'success' => false,
            'message' => 'Missing required form data.'
        ]);
    }
} catch (PDOException $e) {
    // If a database error occurs, return the error message in JSON format
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
*/
?>

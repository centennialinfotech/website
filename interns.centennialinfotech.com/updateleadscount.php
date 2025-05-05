<?php 

include 'dbconnect.php';

try {

// Get the raw POST data
$rawData = file_get_contents("php://input");

// Decode the JSON data into an associative array
$data = json_decode($rawData, true);

// Check if the data was successfully decoded
if (json_last_error() === JSON_ERROR_NONE) {
    // Process the data
    if (isset($data['date'], $data['jobId'], $data['leadscount'], $data['uId'])) {
        $date = $data['date'];
        $jid = $data['jobId'];
        $leadcount = $data['leadscount'];
        $uid = $data['uId'];   
        

        $udatesql = "UPDATE jobPostDate SET leadcount = :leadcount WHERE date = :date AND uid = :uid AND jid = :jid"; 
               // Prepare the SQL statement
               $updatestmt = $pdo->prepare($udatesql);
               // Bind the parameters to the SQL statement
               $updatestmt->bindParam(':date', $date, PDO::PARAM_STR);
               $updatestmt->bindParam(':jid', $jid, PDO::PARAM_STR);
               $updatestmt->bindParam(':leadcount', $leadcount, PDO::PARAM_STR);
               $updatestmt->bindParam(':uid', $uid, PDO::PARAM_INT);
               // Execute the statement
                  if ($updatestmt->execute()) {
                     echo "Record Updated successfully.";
                  } else {
                     echo "Failed to update record.";
                  }
        } else {
        echo "Required fields are missing.";
    }
} else {
    echo "Invalid JSON data.";
}    
} catch (PDOException $e) {
    // Handle any errors with the query
    echo "Error: " . $e->getMessage();
}

?>
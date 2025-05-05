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
    if (isset($data['date'], $data['jobId'], $data['Jobstatus'], $data['uId'])) {
        $date = $data['date'];
        $jid = $data['jobId'];
        $status = $data['Jobstatus'];
        $uid = $data['uId'];
        /*****  Select existing record in jobPostDate : Start *****/
        $checkExisting = "SELECT * FROM jobPostDate WHERE date = :date AND uid = :uid";
         $checkExistingstmt = $pdo->prepare($checkExisting);
         $checkExistingstmt->bindParam(':date', $date, PDO::PARAM_STR);
         $checkExistingstmt->bindParam(':uid', $uid, PDO::PARAM_STR);
         $checkExistingstmt->execute();
         if ($checkExistingstmt->rowCount() > 0) {
             if($jid == 0){
              $status = 0;
              $leadcount = 0;
               $udatesql = "UPDATE jobPostDate SET jid = :jid, status = :status, leadcount = :leadcount WHERE date = :date AND uid = :uid";
               // Prepare the SQL statement
               $updatestmt = $pdo->prepare($udatesql);
               // Bind the parameters to the SQL statement
               $updatestmt->bindParam(':date', $date, PDO::PARAM_STR);
               $updatestmt->bindParam(':jid', $jid, PDO::PARAM_STR);
               $updatestmt->bindParam(':status', $status, PDO::PARAM_STR);
               $updatestmt->bindParam(':leadcount', $leadcount, PDO::PARAM_STR);
               $updatestmt->bindParam(':uid', $uid, PDO::PARAM_INT);
               // Execute the statement
                  if ($updatestmt->execute()) {
                     $response = array("message" => "Record Updated successfully");
                     header('Content-Type: application/json');
                     echo json_encode($response);
                  } else {
                     echo "Failed to update record.";
                  }     
             } else{

            $udatesql = "UPDATE jobPostDate SET jid = :jid WHERE date = :date AND uid = :uid";
               // Prepare the SQL statement
               $updatestmt = $pdo->prepare($udatesql);
               // Bind the parameters to the SQL statement
               $updatestmt->bindParam(':date', $date, PDO::PARAM_STR);
               $updatestmt->bindParam(':jid', $jid, PDO::PARAM_STR);
               //$updatestmt->bindParam(':status', $status, PDO::PARAM_STR);
               $updatestmt->bindParam(':uid', $uid, PDO::PARAM_INT);
               // Execute the statement
                  if ($updatestmt->execute()) {
                     $response = array("message" => "Record Updated successfully");
                     header('Content-Type: application/json');
                     echo json_encode($response);
                  } else {
                     echo "Failed to update record.";
                  }
              }
            } else {

                   /*****  Insert record in jobPostDate : Start *****/

        $sql = "INSERT INTO jobPostDate (date, jid, status, uid) VALUES (:date, :jid, :status, :uid)";

    // Prepare and bind
    if ($stmt = $pdo->prepare($sql)) {
       $stmt->bindParam(':date', $date, PDO::PARAM_STR);
        $stmt->bindParam(':jid', $jid, PDO::PARAM_STR);
        $stmt->bindParam(':status', $status, PDO::PARAM_STR);
        $stmt->bindParam(':uid', $uid, PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo "Record inserted successfully.";
        } else {
            echo "Failed to insert record.";
        }
        /*****  Insert record in jobPostDate : end *****/
        // Close statement
        //$stmt->close();
    } else {
        echo "Error preparing the statement: " . $conn->error;
    }
           


            }
         /*****  Select existing record in jobPostDate : End *****/
     

    // Close connection
    //$conn->close();
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
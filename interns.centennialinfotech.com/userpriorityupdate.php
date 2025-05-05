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
    if (isset($data['usejobprior'], $data['uId'])) {
        $userJobPriority = $data['usejobprior'];
        $uid = $data['uId'];
        /*****  Select existing record in jobPostDate : Start *****/
              /*$checkExisting = "SELECT * FROM jobPostUser WHERE userJobPriority = :usejobprior or uid= :uid";
              $checkExistingstmt = $pdo->prepare($checkExisting);
              $checkExistingstmt->bindParam(':usejobprior', $usejobprior, PDO::PARAM_STR);
              $checkExistingstmt->bindParam(':uid', $uid, PDO::PARAM_STR);
              $checkExistingstmt->execute();
              $userRows = $checkExistingstmt->fetchAll(PDO::FETCH_ASSOC);
              

              $userJobPriority2 = getUserJobPriority($userRows, $uid);
              $uid2 = getUserUserId($userRows, $usejobprior);
         if ($checkExistingstmt->rowCount() > 1) {*/
              

              /*****  Update existing record in jobPostDate : Start *****/
                /* $udatesql = "UPDATE jobPostUser SET userJobPriority = CASE 
                     WHEN uid = :uid1 THEN :usejobprior1
                     WHEN uid = :uid2 THEN :usejobprior2
                 END
                 WHERE uid IN (:uid1, :uid2)";*/
               echo $udatesql = "UPDATE jobPostUser SET userJobPriority = :userJobPriority where uid = :uid";
               // Prepare the SQL statement
               $updatestmt = $pdo->prepare($udatesql);
               // Bind the parameters to the SQL statement
               // Bind the parameters for both users
                //$updatestmt->bindParam(':usejobprior1', $usejobprior1, PDO::PARAM_STR);
                //$updatestmt->bindParam(':usejobprior2', $usejobprior2, PDO::PARAM_STR);
                //$updatestmt->bindParam(':uid1', $uid1, PDO::PARAM_INT);
                //$updatestmt->bindParam(':uid2', $uid2, PDO::PARAM_INT);
               $updatestmt->bindParam(':userJobPriority', $userJobPriority, PDO::PARAM_INT);
               $updatestmt->bindParam(':uid', $uid, PDO::PARAM_INT);
               // Execute the statement
             /* $usejobprior1 = $usejobprior;
              echo $usejobprior2 = getUserJobPriority($userRows, $uid);
              $uid1 = $uid;
              $uid2 = getUserUserId($userRows, $usejobprior);*/
                  if ($updatestmt->execute()) {
                     $response = array("message" => "Record Updated successfully");
                     header('Content-Type: application/json');
                     echo json_encode($response);
                  } else {
                     echo "Failed to update record.";
                  } 
                  /*****  Update existing record in jobPostDate : End *****/
        //} 
          
}
} else {
    echo "Invalid JSON data.";
} 
	
   
    
} catch (PDOException $e) {
    // Handle any errors with the query
    echo "Error: " . $e->getMessage();
}
function getUserJobPriority($array, $searchUid) {
    foreach ($array as $user) {
        if ($user['uid'] == $searchUid) {
            return $user['userJobPriority'];
        }
    }
    return null; // Return null if no match found
} 
function getUserUserId($array, $userJobPriority) {
    foreach ($array as $user) {
        if ($user['userJobPriority'] == $userJobPriority) {
            return $user['uid'];
        }
    }
    return null; // Return null if no match found
} 
?>
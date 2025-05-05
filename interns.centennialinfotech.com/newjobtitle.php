<?php
include 'dbconnect.php';
try {
    if (isset($_POST['jobPostUserpriority']) && isset($_POST['userid'])) {
        $jobpriorities = $_POST['jobPostUserpriority'];
        $userids = $_POST['userid'];
        $date = date('Y-m-d');
        /*****  Select existing record in jobPostDate : Start *****/
        $checkExisting = "SELECT * FROM jobPostDate WHERE date = :date";
         $checkExistingstmt = $pdo->prepare($checkExisting);
         $checkExistingstmt->bindParam(':date', $date, PDO::PARAM_STR);
         $checkExistingstmt->execute();
        
       if ($checkExistingstmt->rowCount() == 0) {

        $sql = "INSERT INTO jobPostDate (date, status, uid, jid) VALUES ";

        // Dynamically create placeholders for the values
        $placeholders = [];
        $values = [];
        $currentDate = date('Y-m-d');  // Missing semicolon fixed

        // Loop through the job priorities and user IDs
        for ($i = 0; $i < count($jobpriorities); $i++) {
            // Assuming you want to insert jobpriority as `jid` and userID as `uid`
            $placeholders[] = "(?, ?, ?, ?)";  // Adding placeholders for date, user ID, and job priority
            $values[] = $currentDate;
            $values[] = 1;       // Insert current date
            $values[] = $userids[$i];       // Insert user ID
            $values[] = $jobpriorities[$i]; // Insert job priority as jid
        }

        // Add the placeholders to the SQL query
        $sql .= implode(", ", $placeholders);

        // Print SQL query for debugging
        print_r($sql);  // Debugging line to check SQL query

        // Prepare the statement
        $stmt = $pdo->prepare($sql);

        // Execute the statement with the bound values
        $stmt->execute($values);

        $message = "New records inserted successfully.";
            header("Location: index.php?message=" . urlencode($message));

       } else{
       	 $message = "Record already exists. Try next day.";
         header("Location: index.php?message=" . urlencode($message));
       }

    }
} catch (PDOException $e) {
    // Handle any errors with the query
     $message = "Error: " . $e->getMessage();
    header("Location: eindex.php?message=" . urlencode($message));
}
?>

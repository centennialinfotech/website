<?php
session_start(); 
include '../dbconnect.php';

try {
    if (isset($_POST['date']) && isset($_POST['job_post_link'])) {
        $jlsid = '';
        $jidjlns = '';
        $jobdateid = '';

        if (isset($_SESSION['leadupatefordateform'])) {
            // Destroy a specific session variable
            unset($_SESSION['leadupatefordateform']);
        }

        // Sanitize input data
        $uid = htmlspecialchars($_POST['userid']);
        $jobPostDate = htmlspecialchars($_POST['date']);
        $jobPostLink = htmlspecialchars($_POST['job_post_link']);
        $screenshot = htmlspecialchars($_POST['screenshot']);

        /* Select job post link - non-duplicate check */
        $stmt = $pdo->prepare("SELECT jobPostDate.jid AS jobdateid, leadjoblinknscreenshot.* 
                               FROM jobPostDate 
                               LEFT JOIN leadjoblinknscreenshot 
                               ON jobPostDate.date = leadjoblinknscreenshot.date 
                               AND jobPostDate.uid = leadjoblinknscreenshot.uid 
                               WHERE jobPostDate.date = :date 
                               AND jobPostDate.uid = :uid");
        $stmt->bindParam(':date', $jobPostDate);
        $stmt->bindParam(':uid', $uid, PDO::PARAM_INT);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Make sure the results are not empty
        if (!empty($results)) {
            $jlsid = $results[0]['jlsid'];
            $jidjlns = $results[0]['jid'];
            $jobdateid = $results[0]['jobdateid'];

            if ($jobdateid != '') {
                // Check if jlsid and jid are both empty
                if ($jlsid == '' && $jidjlns == '') {
                    // Insert new record into leadjoblinknscreenshot table
                    $sqljobliksnss = "INSERT INTO leadjoblinknscreenshot (uid, joblink, screenshot, date, jid) 
                                      VALUES (:uid, :jobPostLink, :screenshot, :jobPostDate, :jid)";
                    $stmtjobliksnss = $pdo->prepare($sqljobliksnss);
                    $stmtjobliksnss->bindParam(':uid', $uid, PDO::PARAM_INT);
                    $stmtjobliksnss->bindParam(':jobPostLink', $jobPostLink, PDO::PARAM_STR);
                    $stmtjobliksnss->bindParam(':screenshot', $screenshot, PDO::PARAM_STR);
                    $stmtjobliksnss->bindParam(':jobPostDate', $jobPostDate, PDO::PARAM_STR);
                    $stmtjobliksnss->bindParam(':jid', $jobdateid, PDO::PARAM_STR);  // Correct placeholder binding

                    // Execute the insert query
                    if ($stmtjobliksnss->execute()) {
                        $message = "You can update applicant details.";
                        header("Location: ../applicantdetail.php?message=" . urlencode($message));
                        exit;  // Exit to stop further code execution after header
                    }
                } else {
                    // If the record exists, set a session variable and show a message
                    $_SESSION['leadupatefordateform'] = $jobPostDate;
                    $message = "Already, You can update applicant details.";
                    header("Location: ../applicantdetail.php?message=" . urlencode($message));
                    exit;  // Exit to stop further code execution after header
                }
            } else {
                // No matching record found
                $_SESSION['leadupatefordateform'] = $jobPostDate;
                $message = "No record found.";
                header("Location: ../applicantdetail.php?message=" . urlencode($message));
                exit;  // Exit to stop further code execution after header
            }
        } else {
            // No results from the SELECT query
            $_SESSION['leadupatefordateform'] = $jobPostDate;
            $message = "No record found.";
            header("Location: ../applicantdetail.php?message=" . urlencode($message));
            exit;  // Exit to stop further code execution after header
        }
    }
} catch (PDOException $e) {
    // If a database error occurs, return the error message in JSON format
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>

<?php
session_start();
include "dbconnect.php";
/*********************************************************************************************
 *                               Check User existed or not  : Start 
 * ******************************************************************************************/
$nonuserfound ='';
if (isset($_POST['loginphone'])) {
    // Get the phone number from the form input
    $phone = htmlspecialchars($_POST['loginphone']);

    try {

        $sqluserlogin = "SELECT * FROM jobPostUser WHERE phonenumber = :phone AND phonenumber != 0"; // Ensuring LIMIT 1 to 
        $stmtuserlogin = $pdo->prepare($sqluserlogin);
        $stmtuserlogin->bindParam(':phone', $phone, PDO::PARAM_STR);
        $stmtuserlogin->execute();
        if ($stmtuserlogin->rowCount() === 1) { // Ensure only one row is returned
            $userloggedIn = $stmtuserlogin->fetch(PDO::FETCH_ASSOC);
            $_SESSION['username'] = $userloggedIn['username'];
            $_SESSION['loggedInuserid'] = $userloggedIn['uid'];
            
        } else {
           $nonuserfound = 1;
        }

    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
/*********************************************************************************************
 *                               Get job id and jobpost link id job title  : Start 
 * ******************************************************************************************/
if(!empty($_SESSION['loggedInuserid']) && !empty($_SESSION['leadupatefordateform'])){
     $leadUpdateForDate = $_SESSION['leadupatefordateform']; // 2025-01-30
     $loggedInUserId = $_SESSION['loggedInuserid'];
     $sqljobnlinkid = "SELECT jobPostDate.jid, leadjoblinknscreenshot.jlsid, jobPostTittle.title FROM jobPostDate JOIN leadjoblinknscreenshot ON jobPostDate.uid = leadjoblinknscreenshot.uid JOIN jobPostTittle ON jobPostDate.jid = jobPostTittle.jobid WHERE jobPostDate.date = :leadUpdateForDate AND leadjoblinknscreenshot.date = :leadUpdateForDate AND jobPostDate.uid = :loggedInUserId";
$stmtjobnlinkid = $pdo->prepare($sqljobnlinkid);
$stmtjobnlinkid->bindParam(':leadUpdateForDate', $leadUpdateForDate, PDO::PARAM_STR);
$stmtjobnlinkid->bindParam(':leadUpdateForDate', $leadUpdateForDate, PDO::PARAM_STR);
    $stmtjobnlinkid->bindParam(':loggedInUserId', $loggedInUserId, PDO::PARAM_INT);
$stmtjobnlinkid->execute();
$stmtjobnlinkidRows = $stmtjobnlinkid->fetchAll(PDO::FETCH_ASSOC);
$jobtile = $stmtjobnlinkidRows[0]['title'];
$jobid = $stmtjobnlinkidRows[0]['jid'];
$joblinknss = $stmtjobnlinkidRows[0]['jlsid'];

}
/*********************************************************************************************
 *                               Second form Job link Screenshot   : Start 
 * ******************************************************************************************/
$uid = $jlsid = $jidjlns = $jobdateid = '';
$jobpostlikErr = $jscreenshotErr = $dateErr = '';
if (isset($_POST['date']) && isset($_POST['job_post_link'])) {
     if (!empty($_POST['date'])) {
        $jobPostDate = $_POST['date'];  // Get the date from POST

        // Convert the provided date to a DateTime object
        $providedDate = DateTime::createFromFormat('Y-m-d', $jobPostDate);
        $currentDate = new DateTime();  // Get the current date
        
        // If the provided date is greater than the current date
        if ($providedDate > $currentDate) {
            $dateErr = "The job post date cannot be in the future.";
        }
    }    
    
    if (empty($_POST['job_post_link'])) {
        $jobpostlikErr = 'Enter LinkedIn job post URL.';
    } else {
        $jobPostLink = $_POST['job_post_link'];  // Sanitize input
        if (!preg_match('/^(https:\/\/(www\.)?(wellfound\.com|linkedin\.com)\/(recruit\/jobs\/\d+|jobs\/view\/\d+|hiring\/jobs\/\d+))$/', $jobPostLink)) {
            $jobpostlikErr = "Invalid LinkedIn job post URL: https://linkedin.com/jobs/view/numbers";
        }
    }
    if (empty($_POST['screenshot'])) {
        $screenshotErr = 'Enter Screenshot URL.';
    } else {
        $jobPostLink = $_POST['screenshot'];  // Sanitize input
        if (!preg_match('/^https:\/\/prnt\.sc\/[a-zA-Z0-9\-]+$/', $jobPostLink)) {
            $screenshotErr = "Invalid LinkedIn job post screeshot url: https://prnt.sc/id";
        }
    }
    // Proceed if there are no errors
    if (empty($jobpostlikErr) && empty($jscreenshotErr) && empty($dateErr)) {
        if (isset($_SESSION['leadupatefordateform'])) {
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
        //echo "<pre>";
        //print_r($results); die;
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
                        header("Location: " . $_SERVER['PHP_SELF']);
                        exit();
                    }
                } else {
                    // If the record exists, set a session variable and show a message
                    $_SESSION['leadupatefordateform'] = $jobPostDate;
                    $message = "Already, You can update applicant details.";
                    header("Location: " . $_SERVER['PHP_SELF']);
                    exit();
                }
            } else {
                // No matching record found
                $_SESSION['leadupatefordateform'] = $jobPostDate;
                $message = "No record found.";
                //header("Location: ../applicantdetail.php?message=" . urlencode($message));
                exit;  // Exit to stop further code execution after header
            }
        } else {
            // No results from the SELECT query
            $_SESSION['leadupatefordateform'] = $jobPostDate;
            $message = "No record found.";
            //header("Location: ../applicantdetail.php?message=" . urlencode($message));
            exit;  // Exit to stop further code execution after header
        }
    }
}


/*********************************************************************************************
 *                               Select leads  : Start 
 * ******************************************************************************************/

$sqLeads = "SELECT * FROM leadupdate order by lid DESC";
$stmtLeads = $pdo->prepare($sqLeads);
$stmtLeads->execute();
$stmtLeadsRows = $stmtLeads->fetchAll(PDO::FETCH_ASSOC);
/*********************************************************************************************
 *                               Third Form to update leads : Start                          
 * ******************************************************************************************/

$name = $email = $phone = $address = $joblinknssid = $uid = $leaddate ='';
$nameErr = $emailErr = $phoneErr = $addressErr = '';

if (isset($_POST['leadupdateformsubmit'], $_POST['name'], $_POST['email'], $_POST['phone'], $_POST['address'])) {
/* Name error */
if (empty($_POST['name'])) {
   $nameErr = 'Full Name is required.';
} else {
   $name = $_POST['name'];  // Sanitize input
   if (!preg_match("/^[a-zA-Z.\'\s-]+$/", $name)) {
        $nameErr = "Full Name can only contain letters, apostrophes, periods, spaces, and hyphens.";
    }
}
/* Email error */
if (empty($_POST['email'])) {
   $emailErr = 'Full Email is required.';
} else {
   $email = htmlspecialchars($_POST['email']);  // Sanitize input
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $emailErr = "Invalid email format.";
    }
}
/* Phone Error */
if (empty($_POST['phone'])) {
   $phoneErr = 'Phone NUmber is required.';
} else {
   $phone = htmlspecialchars($_POST['phone']);  // Sanitize input
   if (!preg_match("/^\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/", $phone)) {
        $phoneErr = "Invalid phone number format. Please enter a valid number with country code, e.g., +1 123-456-7890 or +44 20 7946 0958.";
    }
}
/* Address error */
if (empty($_POST['address'])) {
   $addressErr = 'Address is required.';
} else {
   $address = $_POST['address'];  // Sanitize input
   if (!preg_match("/^[a-zA-Z0-9,.'\s-]+$/", $address)) {
            $addressErr = "Address can only contain letters, numbers, commas, periods, apostrophes, spaces, and hyphens.";
        }
}

if (empty($nameErr) && empty($emailErr) && empty($phoneErr) && empty($addressErr)) {

        // Collect form data
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $phone = htmlspecialchars($_POST['phone']);
        $address = htmlspecialchars($_POST['address']);
        //$joblinknssid = htmlspecialchars($_POST['joblinknss']);
        //$jobid = htmlspecialchars($_POST['jobidleadupdate']);
        $joblinknssid = $_POST['joblinknssleadupdate'];
        $uid = $_POST['useridleadupdate'];
        $leaddate = $_POST['dateleaddate'];
        /* Select to check existing record */
        $selectstmt = $pdo->prepare("Select * from leadupdate WHERE name = :name AND email = :email AND  phone = :phone AND joblinknssid = :joblinknssid");

        $selectstmt->bindParam(':name', $name , PDO::PARAM_STR);
        $selectstmt->bindParam(':email', $email , PDO::PARAM_STR);
        $selectstmt->bindParam(':phone', $phone , PDO::PARAM_STR);
        $selectstmt->bindParam(':joblinknssid', $joblinknssid , PDO::PARAM_INT);
        $selectstmt->execute();
       if ($selectstmt->rowCount() === 0) {

    
        

        // Prepare the SQL query to insert data into the database
        $stmt = $pdo->prepare("INSERT INTO leadupdate (name, email, phone, address, uid, joblinknssid, leaddate) VALUES (:name, :email, :phone, :address, :uid, :joblinknssid, :leaddate)");

$stmt->bindParam(':name', $name, PDO::PARAM_STR);
$stmt->bindParam(':email', $email, PDO::PARAM_STR);
$stmt->bindParam(':phone', $phone, PDO::PARAM_STR);
$stmt->bindParam(':address', $address, PDO::PARAM_STR);
$stmt->bindParam(':uid', $uid, PDO::PARAM_INT);
$stmt->bindParam(':joblinknssid', $joblinknssid, PDO::PARAM_INT);
$stmt->bindParam(':leaddate', $leaddate, PDO::PARAM_STR);
        

        // Try to execute the query
        if ($stmt->execute()) {
            // Return a success response in JSON format
            $_SESSION['message'] = "Record inserted successfully.";
            header("Location: " . $_SERVER['PHP_SELF']);
            exit();
     //header("Location: ../applicantdetail.php?message=" . urlencode($message));
        } else {
            $_SESSION['message'] = "Nothing to update";
            
        }
    }else{
        $_SESSION['message'] = "Record updated successfully";
     //header("Location: ../applicantdetail.php?message=" . urlencode($message));
    }
}else{
    //$_SESSION['message'] = "There are errors in your form. Please correct them and try again.";
}
}
/*********************************************************************************************
 *                               Third Form to update leads : End 
 * ******************************************************************************************/
$bulkleadname = $bulkleademail = $bulkleadphone = $bulkleadaddress = $lid = '';
//$bulkleadnameErr = $bulkleademailErr = $bulkleadphoneErr = $bulkleadaddressErr = [];
    //$bulkleadaddressErr = [];
if (isset($_POST['submit_row'])) {
    unset($_SESSION['message']);
    $row_id = $_POST['submit_row']; // Get the row number (e.g., 1, 2, etc.)

    // Initialize error arrays
    

    // Get the data for that specific row
    $bulkleadname = $_POST['bulkleadupdatename'][$row_id - 1];
    $bulkleademail = $_POST['bulkleadupdateemail'][$row_id - 1];
    $bulkleadphone = $_POST['bulkleadupdatephone'][$row_id - 1];
    $bulkleadaddress = $_POST['bulkleadupdateaddress'][$row_id - 1];
    $lid = $_POST['lid'][$row_id - 1];

    // Validate Full Name
    if (empty($bulkleadname)) {
        $bulkleadnameErr[$lid] = 'Full Name is required.';
    } else {
        if (!preg_match("/^[a-zA-Z.'\s-]+$/", $bulkleadname)) {
            $bulkleadnameErr[$lid] = "Full Name can only contain letters, apostrophes, periods, spaces, and hyphens.";
            
        }
    }

    // Validate Email
    if (empty($bulkleademail)) {
        $bulkleademailErr[$lid] = 'Email is required.';
    } else {
        if (!filter_var($bulkleademail, FILTER_VALIDATE_EMAIL)) {
            $bulkleademailErr[$lid] = "Invalid email format.";
            
        }
    }

    // Validate Phone Number
    if (empty($bulkleadphone)) {
        $bulkleadphoneErr[$lid] = 'Phone number is required.';
    } else {
        if (!preg_match("/^\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/", $bulkleadphone)) {
            $bulkleadphoneErr[$lid] = "Invalid phone number format.";
            
        }
    }

    // Validate Address
    if (empty($bulkleadaddress)) {
        $bulkleadaddressErr[$lid] = 'Address is required.';
    } else {
        if (!preg_match("/^[a-zA-Z0-9,.'\s-]+$/", $bulkleadaddress)) {
            $bulkleadaddressErr[$lid] = "Address can only contain letters, numbers, commas, periods, apostrophes, spaces, and hyphens.";
            
        }
    }

    // If no errors, update the record
    if (empty($bulkleadnameErr[$lid]) && empty($bulkleademailErr[$lid]) && empty($bulkleadphoneErr[$lid]) && empty($bulkleadaddressErr[$lid])) {
        // Prepare and execute the update query
        $stmt = $pdo->prepare("UPDATE leadupdate SET name = :name, email = :email, phone = :phone, address = :address WHERE lid = :lid");

        $stmt->bindParam(':name', $bulkleadname, PDO::PARAM_STR);
        $stmt->bindParam(':email', $bulkleademail, PDO::PARAM_STR);
        $stmt->bindParam(':phone', $bulkleadphone, PDO::PARAM_STR);
        $stmt->bindParam(':address', $bulkleadaddress, PDO::PARAM_STR);
        $stmt->bindParam(':lid', $lid, PDO::PARAM_INT);

        // Try to execute the query
        if ($stmt->execute()) {
            $_SESSION['message'] = "Record updated successfully.";
            header("Location: " . $_SERVER['PHP_SELF']);
            exit();
        } else {
            $_SESSION['message'] = "Nothing to update.";
        }
    } else {
       // $_SESSION['message'] = "There are errors in your form. Please correct them and try again.";
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Form with Add Row</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/leads.css" rel="stylesheet" type="text/css">
    
</head>
<body>
<div class="p-0 m-0 shadow-none">
        <div class="p-0 m-0 shadow-none">
    <?php if(!empty($nonuserfound) AND $nonuserfound === 1){ ?>

     <div id="successMessage" style="color: #4CAF50; padding: 10px; text-align: center;">
        No User found, Try login with mobile number OR Contact with Administrator!
    </div>
    <?php }
    ?>

            <?php
if (isset($_GET['message'])) {
    $message = htmlspecialchars($_GET['message']); 
    echo "<div class='jobtitlemessages'>$message</div>";
    echo "<script>
        setTimeout(function() {
            window.location.href = '/applicantdetail.php'; // Replace with your target URL
        }, 1000); // 5000ms = 5 seconds
      </script>"; 
}



if (isset($_SESSION['message'])) {
    echo "<div class='successMessage'>".$_SESSION['message']."</div>"; // Display the message
    unset($_SESSION['message']); // Clear the message after displaying it
}
?>

   </div>  

<!--  Job link and screenshot form start-->
<div class="p-0 m-0 shadow-none">
<?php if (!empty($_SESSION['username']) && empty($_SESSION['leadupatefordateform'])) { 
     
    echo "<div class='loggedInusernamedisp'>Hello ".ucfirst($_SESSION['username'])."</div>";
    
    ?>
    <div class="p-4">
    <form action="" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="userid" value="<?php echo isset($_SESSION['loggedInuserid']) ? $_SESSION['loggedInuserid'] : '' ?>">
        <div class="form-group row">
            <label for="date" class="col-lg-3 col-md-4 col-sm-12">Date</label>
                    <div class="col-lg-9 col-md-8 col-sm-12">
            <input type="date" id="date" name="date" required>
             <?php if (!empty($dateErr)) {?><span style="color:#FF0000;"><?php echo $dateErr; ?></span><?php } ?>
        </div>
        </div>
        <div class="form-group row">
            <label for="job_post_link" class="col-lg-3 col-md-4 col-sm-12">Job Post Link</label>
                    <div class="col-lg-9 col-md-8 col-sm-12">
            <input type="url" id="job_post_link" name="job_post_link" placeholder="https://www.linkedin.com/jobs/view/numeric value" required>
            <?php if (!empty($jobpostlikErr)) {?><span style="color:#FF0000;"><?php echo $jobpostlikErr; ?></span><?php } ?>
            </div>
        </div>
        <div class="form-group row">
            <label for="screenshot" class="col-lg-3 col-md-4 col-sm-12">Screenshot link</label>
            <div class="col-lg-9 col-md-8 col-sm-12">
            <input type="url" id="screenshot" name="screenshot" placeholder="https://prnt.sc/numeric value" required>
            <?php if (!empty($screenshotErr)) {?><span style="color:#FF0000;"><?php echo $screenshotErr; ?></span><?php } ?>
            </div>
        </div>
         <p>OR </p>
        <div class="form-group row">
            <label for="image_upload">Upload Image (Feature is currently In-progress)</label>
            <input type="file" id="image_upload" name="image_upload" accept="image/*">
        </div>
        <div class="d-flex justify-content-center align-items-center">
                    <button type="submit" class="btn btn-primary btn-sm"
                        style="width:100px;margin-bottom:1%">Submit</button>
                </div>
    </form>
  </div>
  </div>

<?php } else if(!empty($_SESSION['username']) && !empty($_SESSION['leadupatefordateform'])){ 
     echo "<h4 class='text-center mb-4'>Hello ".ucfirst($_SESSION['username'])." - Date: <strong>".$_SESSION['leadupatefordateform']."</strong> and Title: <strong>".$jobtile."</strong></h4>";
     $rowCount = count($stmtLeadsRows);
     echo "<h5 class='text-center mb-4'>Number of applicant added: " . $rowCount."<h5>";
         
     ?>
   
    <form id="leadupdateform" action="" method="post">
        <input type="hidden" name="dateleaddate" value="<?php echo isset($_SESSION['leadupatefordateform']) ? $_SESSION['leadupatefordateform'] : '' ?>">
        <input type="hidden" name="useridleadupdate" value="<?php echo isset($_SESSION['loggedInuserid']) ? $_SESSION['loggedInuserid'] : '' ?>">
        <input type="hidden" name="jobidleadupdate" value="<?php echo isset($jobid) ? $jobid : '' ?>">
        <input type="hidden" name="joblinknssleadupdate" value="<?php echo isset($joblinknss) ? $joblinknss : '' ?>">
        <div id="formRows" class="border p-3 mb-4" style="width: 100%;">
                    <div class="form-group row">
                        <label for="name" class="col-lg-3 col-md-4 col-sm-12">Full Name</label>
                        <div class="col-lg-9 col-md-8 col-sm-12">
                            <input type="text" name="name" class="form-control form-control-sm" required value="<?php echo $name; ?>">
                            <?php if (!empty($nameErr)) {?><span style="color:#FF0000;"><?php echo $nameErr; ?></span><?php } ?>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="email" class="col-lg-3 col-md-4 col-sm-12">Email Address</label>
                        <div class="col-lg-9 col-md-8 col-sm-12">
                            <input type="email" name="email" class="form-control form-control-sm" required value="<?php echo $email; ?>">
                            <?php if (!empty($emailErr)) {?><span style="color:#FF0000;"><?php echo $emailErr; ?></span><?php } ?>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="phone" class="col-lg-3 col-md-4 col-sm-12">Phone Number</label>
                        <div class="col-lg-9 col-md-8 col-sm-12">
                            <input type="tel" name="phone" class="form-control form-control-sm" value="<?php echo $phone; ?>" required
                                placeholder="(xxx) xxx-xxxx">
                                <?php if (!empty($phoneErr)) {?><span style="color:#FF0000;"><?php echo $phoneErr; ?></span><?php } ?>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="address" class="col-lg-3 col-md-4 col-sm-12">Address</label>
                        <div class="col-lg-9 col-md-8 col-sm-12">
                            <textarea name="address" rows="2" class="form-control form-control-sm" required><?php echo $address; ?></textarea>
                            <?php if (!empty($addressErr)) {?><span style="color:#FF0000;"><?php echo $addressErr; ?></span><?php } ?>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                    <!-- <button type="submit" class="btn btn-primary btn-sm" onclick="leadUpdateFormSendData(event)"
                        style="width:100px;margin-bottom:1%">
                        Save
                    </button> -->
                    <button type="submit" class="btn btn-primary btn-sm"
                        style="width:100px;margin-bottom:1%" name="leadupdateformsubmit">
                        Save
                    </button>
                </div>
         </form>

<div class="p-0 m-0 shadow-none">
 <form name="leadbulkupdateform" action="" method="POST">
<div class="table-responsive leadbulkupdatetable">
                    <table class="table table-bordered" style="table-layout: fixed;">
                        <thead class="sticky-top bg-light">
                            <tr>
                                <th class="text-center" style="width: 20%;">S.No</th>
                                <th style="width: 20%;">Name</th>
                                <th style="width: 20%;">Email</th>
                                <th style="width: 20%;">Phone</th>
                                <th style="width: 20%;">Address</th>
                                 <th style="width: 10%;">Action</th>
                            </tr>
                        </thead>
                    </table>
    <div style="max-height: 400px; overflow-y: auto;">
                        <table class="table table-bordered" style="table-layout: fixed;width:100%">
                            <tbody>
        <?php 
        //echo "<pre>"; print_r($bulkleadnameErr);
    $key = 1;
    //$bulkleadnameErr = $bulkleademailErr = $bulkleadphoneErr = $bulkleadaddressErr = [];
    if($stmtLeadsRows){
        foreach ($stmtLeadsRows as $value) {
            //print_r($bulkleadnameErr);
            //echo $nameError = isset($bulkleadnameErr[$value['lid']]) ? $bulkleadnameErr[$value['lid']] : '';
            echo "<tr style='border: 1px solid black;margin:10px;border-radius:1%' id='" . $key ."'>";
            echo "<td data-label='S.No' class='text-center'>" . $key . "</td>";
            
            // Full Name with error message if any
            echo "<td data-label='Name'><label for='name' style='font-weight: bold;'>Full Name:</label> 
                  <input type='text' class='form-control' name='bulkleadupdatename[]' value='" . htmlspecialchars($value['name']) . "' required>";
            if (!empty($bulkleadnameErr[$value['lid']])) {
                echo "<span class='errormessage' style='color:#FF0000;'>" . $bulkleadnameErr[$value['lid']] . "</span>";
            }

            echo "<input type='hidden' name='lid[]' value='" . htmlspecialchars($value['lid']) . "' ></td>";

            // Email
            echo "<td data-label='Email'><label for='email' style='font-weight: bold;'>Email:</label>
                  <input type='email' class='form-control' name='bulkleadupdateemail[]' value='" . htmlspecialchars($value['email']) . "' required>";
                  if (!empty($bulkleademailErr[$value['lid']])) {
                echo "<span class='errormessage' style='color:#FF0000;'>" . $bulkleademailErr[$value['lid']] . "</span>";
            }   
            echo  "</td>";
            
            // Phone
            echo "<td data-label='Phone'><label for='phone' style='font-weight: bold;'>Phone:</label>
                  <input type='tel' class='form-control' name='bulkleadupdatephone[]' value='" . htmlspecialchars($value['phone']) . "' required placeholder='(xxx) xxx-xxxx'>";
                  if (!empty($bulkleadphoneErr[$value['lid']])) {
                echo "<span class='errormessage' style='color:#FF0000;'>" . $bulkleadphoneErr[$value['lid']] . "</span>";
            } 
                  echo "</td>";
            
            // Address
            echo "<td data-label='Address'><label for='address' style='font-weight: bold;'>Address:</label>
                  <textarea class='form-control' name='bulkleadupdateaddress[]' rows='4' required>" . htmlspecialchars($value['address']) . "</textarea>";
                  if (!empty($bulkleadaddressErr[$value['lid']])) {
                echo "<span class='errormessage' style='color:#FF0000;'>" . $bulkleadaddressErr[$value['lid']] . "</span>";
            }
                  echo "</td>";

            // Submit button
            echo "<td><button type='submit' class='btn btn-primary' name='submit_row' value='" . $key . "'>Submit</button></td>";
            echo "</tr>";
            $key++;
        }
    }
?>

    </tbody>
    </table>
</div>

</div>
</form>
</div>
<?php 
 } else { ?>

    <!--  login page Start -->
    <div class="container mt-5 d-flex justify-content-center"> 
    <div class="p-4 form-container">  
<form action="" method="POST" name="loginpage" enctype="multipart/form-data" id="leadupdateform">
        <div class="mb-3 form-group">
            <label for="loginphone" class="form-label fw-bold">Enter Your Phone Number</label>
            <input type="text" id="loginphone" name="loginphone" class="form-control form-control-sm" required>
        </div>
        <button type="submit" class="btn btn-primary btn-sm btn-submit">Submit</button>
        
    </form>
    </div>
    </div>
<!--  login page End -->




<?php } ?>
</div>
</div>

<script>
    function leadUpdateFormSendData(event, updatelead) {
             event.preventDefault(); // Prevent default form submission

        const form = document.getElementById('leadupdateform');
        const formData = new FormData(form);
        console.log(formData);

        // Send form data to PHP via fetch
        fetch('leads/leadupdate.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // Assuming the server responds with JSON
        .then(data => {
            // Handle the response from the server
            if (data.success) {
                const successMessage = document.getElementById('successMessage');
            successMessage.style.display = 'block';                
                form.reset(); // Optionally reset the form
                 setTimeout(() => {
                successMessage.style.display = 'none';
            }, 10000);
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while submitting the form.');
        });
        }
</script> 
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"></script>
</body>
</html>
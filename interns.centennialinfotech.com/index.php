<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Job Titles</title>



    <!-- Link to the external CSS file -->

    <link rel="stylesheet" href="styles.css" type="text/css"> <!-- Adjust path as needed -->

    <style>
        .styled-table {

            width: 100%;

            border-collapse: collapse;

            border: 2px solid #333;
            /* Add border around the entire table */

        }

        .styled-table th,
        .styled-table td {

            padding: 10px;

            border: 3px solid #000000;
            /* Light gray border for table cells */

            text-align: left;

        }

        .styled-table th {

            background-color: #f4f4f4;
            /* Light background for headers */

        }



        .styled-table td.close {

            background-color: #FF0000;

        }

        .styled-table td.active {

            background-color: #90EE90;

        }

        .styled-table thead p {
            font-size: 10px;

            font-weight: bolder;

        }

        .styled-table thead .user-name {

            font-size: 25px;

            text-align: center;

            border: 1px solid #000000;

            color: #ffffff;

            background: #000;

            border-radius: 4px;

            padding: 5px;

        }

        .styled-table thead .user-name span {

            padding-right: 30px;

        }

        .styled-table td.post p {

            color: #008000;

        }

        .styled-table thead {

            position: sticky;

            top: 0;

            background-color: #fff;

            z-index: 4;

        }

        .styled-table tbody tr td:first-child,
        .styled-table thead tr th:first-child {

            position: sticky;

            left: 0;

            background-color: #fff;
            /* Optional: to ensure the sticky cell has a background */

            z-index: 5;
            /* Keep it above the other content */

        }

        .form-submission {

            padding: 10px;

            margin-top: 10px;

            font-weight: bold;

            text-align: center;

            border: 1px solid #000000;

            color: #ffffff;

            background: #000;

            border-radius: 4px;

            font-size: larger;

            cursor: pointer;

        }

        .whasttitlesshare,
        .whastmessagesshare {

            width: 270px;

            padding: 10px;

            margin-top: 10px;

            font-weight: bold;

            text-align: center;

            border: 1px solid #000000;

            color: #ffffff;

            background: #000;

            border-radius: 4px;

        }

        .whasttitlesshare a,
        .whastmessagesshare a {

            text-decoration: none;

            color: #ffffff;

        }

        #bottomToggleButton,
        #topToggleButton {

            margin-left: 87px;

            background-color: #000;

            color: #fff;

            cursor: pointer;

            border-radius: 5px;

            padding: 5px;

        }

        #topToggleButton {

            margin-top: 10px;

        }

        .jobtitlemessages {

            padding: 15px;

            margin: 10px;

            border-radius: 5px;

            text-align: center;

            color: green;

            font-size: 18px;

            font-weight: bold;

            border: 3px solid green;

        }

        .success-message {

            background-color: #4CAF50;

            color: white;

        }

        .error-message {

            background-color: #f44336;

            color: white;

        }

        .table-container {
            width: 100%;
            /* Adjust based on your requirement */
            overflow: auto;
            /* Adjust as needed to show only 2 columns */
            position: relative;
        }


        .styled-table thead {
            position: sticky;
            top: 0;
            background-color: #fff;
            z-index: 3;
            /* Ensures header stays above the table body */
        }

        /* Fix the first column */
        .styled-table tbody tr td:first-child,
        .styled-table thead tr th:first-child {
            position: sticky;
            left: 0;
            background-color: #fff;
            z-index: 4;
            /* Keeps the first column above other content */
        }

        /* Ensure top-left corner (first cell) is always above everything */
        .styled-table thead tr th:first-child {
            z-index: 5;
        }

        /* Improve scrolling for the table container */
        .table-container {
            width: 100%;
            overflow: auto;
            position: relative;
            max-height: 90vh;
            /* Adjust this based on your table height */
        }

        .styled-table th {
            position: sticky;
            top: 0;
            left: 0;
            background-color: #fff;
            z-index: 5;
            padding: 10px;
            border: 3px solid #000000;
            text-align: center;
            vertical-align: top;
        }

        @media screen and (max-width: 768px) {
            table {
                font-size: 12px;
            }

            th,
            td {
                min-width: 80px;
            }

            .styled-table th,
            .styled-table td {
                padding: 0.5vw;
                font-size: 12px;
                min-width: 80px;
            }
        }

        .styled-table td .startDate {
            width: 100%;
            padding: 5px;
            border: 2px solid #000;
            border-radius: 5px;
            font-size: 16px;
        }

        /* Ensure proper spacing and alignment */
        .styled-table td .updateapplicants {
            width: 100%;
            padding: 5px;
            border: 2px solid #000;
            border-radius: 5px;
            font-size: 16px;
        }


        /* Ensure table cell has proper padding */
        .styled-table td.close {
            padding: 10px;
            text-align: center;
        }

        td input[type="date"] {
            box-sizing: border-box;
        }

        td input[type="text"],
        td select {
            width: 90%;
            /* Adjust the width percentage */
            max-width: 200px;
            /* Set a max-width to limit the size */
            box-sizing: border-box;
        }

        .button-container {
            display: flex;
            justify-content: center;
            /* Align buttons to the center */
            gap: 15px;
            /* Space between buttons */
            flex-wrap: wrap;
            /* Allow wrapping on smaller screens */
        }

        .btn-custom {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            /* Set height to be the same */
            padding: 10px 20px;
            /* Consistent padding */
            font-size: 16px;
            text-align: center;
        }


        .styled-table td select {
            width: 100%;
            min-width: 300px;
            /* Ensure a reasonable default width */
            max-width: none;
            /* Remove width restrictions */
            white-space: normal;
            word-wrap: break-word;
            overflow-wrap: break-word;
            text-overflow: ellipsis;
        }

        /* Ensure the dropdown expands to fit the content */
        .styled-table td select option {
            white-space: normal;
            word-wrap: break-word;
        }



        /* Mobile-friendly Table Adjustments */
        @media screen and (max-width: 768px) {

            .styled-table {
                width: 100%;
                min-width: 600px;
                overflow-x: auto;
                display: block;
                transform: scale(0.60);
                /* Zoom out the table */

                transform-origin: top left;
                /* Keeps the table anchored to the top left corner */
            }

            .styled-table th,
            .styled-table td {
                min-width: 120px;
                /* Ensures content fits */
                max-width: 100%;
                font-size: 12px;
                padding: 6px;
                text-align: center;
                word-wrap: break-word;
                white-space: normal;
            }

            /* Fix first column */
            .styled-table tbody tr td:first-child,
            .styled-table thead tr th:first-child {
                min-width: 120px;
                background-color: #fff;
                z-index: 5;
            }

            /* Ensure proper scrolling */
            .table-container {
                overflow-x: auto;
                width: 100%;
                padding: 0;
                /* Remove padding */
                margin: 0;
                /* Remove margin */
                box-sizing: border-box;
                /* Ensure padding and borders are included in width calculations */
            }

            /* Buttons */
            .button-container {
                flex-direction: column;
                align-items: center;
            }

            .btn-custom {
                width: 100%;
                max-width: 300px;
            }

            /* Fix dropdown width */
            .styled-table td select {
                width: 100%;
                min-width: 200px;
                max-width: 250px;
                font-size: 6px;
            }

            .startDate {
                max-width: 125px;
                font-size: 10px;
            }

            tbody tr td {
                max-width: 600px;
            }

            .user-name {
                font-size: 8px;
                max-width: 400px;
            }

            td input[type="text"],
            td select {
                width: 50%;
                /* Adjust the width percentage */
                max-width: 75px;
                /* Set a max-width to limit the size */
                box-sizing: border-box;
            }

            td input[type="date"] {
                box-sizing: border-box;
                width: 75px;
                font-size: 7px;
            }
        }
    </style>

</head>

<body>

    <?php

    include "dbconnect.php";

    date_default_timezone_set('Asia/Kolkata');

    try {

        $sqluser =

            "SELECT * FROM jobPostUser WHERE status != 0 order by userJobPriority ASC"; //
    
        $sqljobs = "SELECT * FROM jobPostTittle";

        $sqlJobPostDate =

            "SELECT DISTINCT date, status, jid, uid, leadcount FROM jobPostDate order by date ASC";

        $CurrentDatetitle_Uname =

            "SELECT jobPostUser.Name, jobPostUser.phonenumber, jobPostTittle.title, jobPostDate.uid, jobPostDate.status FROM jobPostTittle JOIN jobPostDate ON jobPostTittle.jobid = jobPostDate.jid JOIN jobPostUser ON jobPostUser.uid = jobPostDate.uid WHERE jobPostDate.date = CURRENT_DATE";

        $stmtuser = $pdo->prepare($sqluser);

        $stmtjobs = $pdo->prepare($sqljobs);

        $stmtPostDate = $pdo->prepare($sqlJobPostDate);

        $preCurrentDatetitle_Uname = $pdo->prepare($CurrentDatetitle_Uname);

        $stmtuser->execute();

        $stmtjobs->execute();

        $stmtPostDate->execute();

        $preCurrentDatetitle_Uname->execute();

        $userRows = $stmtuser->fetchAll(PDO::FETCH_ASSOC);

        $stmtJobs = $stmtjobs->fetchAll(PDO::FETCH_ASSOC);

        $stmtPostDates = $stmtPostDate->fetchAll(PDO::FETCH_ASSOC);

        $fetCurrentDatetitle_Uname = $preCurrentDatetitle_Uname->fetchAll(

            PDO::FETCH_ASSOC

        );

        $dates = array_column($stmtPostDates, "date"); // Extract all dates
    
        $unique_dates = array_unique($dates); // Get unique dates
    
        $last_nine_dates = array_slice($unique_dates, -9);

        $getUniquedates = [];

        foreach ($last_nine_dates as $date) {

            $getUniquedates[] = ["date" => $date];

        }

        ?>

        <form action="/newjobtitle.php" method="post">

            <?php

            if (isset($_GET['message'])) {

                $message = htmlspecialchars($_GET['message']);

                echo "<div class='jobtitlemessages'>$message</div>";

                echo "<script>

        setTimeout(function() {

            window.location.href = '/'; // Replace with your target URL

        }, 5000); // 5000ms = 5 seconds

      </script>";

            }

            ?>
            <div class="table-container">
                <table class="styled-table">

                    <thead>

                        <tr>

                            <th class="startDate">Detail</th>

                            <?php

                            if ($userRows) {

                                foreach ($userRows as $userRow) {



                                    echo "<th>";

                                    $userPrior = $userRow["userJobPriority"];

                                    $filteredData = filterByUID(

                                        $stmtPostDates,

                                        $userRow["uid"]

                                    );

                                    $checkmissingjid = checkMissingNumbers(

                                        $filteredData,

                                        1,

                                        15

                                    );

                                    $userjobpriority = reset($checkmissingjid);

                                    echo "<div class='user-name'>" . $userRow["Name"];

                                    ?>

                                    <input type="hidden" name="jobpriority[]" value="<?php echo $userPrior; ?>"><input type="hidden"
                                        name="userid[]" value="<?php echo $userRow[

                                            "uid"

                                        ]; ?>">

                                    <select name="jobPostUserpriority[]" id="jobPostUserpriority"
                                        onchange="jobBoardtUserpriority(this)" data="<?php echo $userRow[

                                            "uid"

                                        ]; ?>">

                                        <option value="0">S</option>

                                        <?php

                                        $counter = 0;

                                        foreach ($userRows as $userRow) {

                                            $counter++;

                                            $selectedprior =

                                                $userPrior == $counter ? "selected" : "";

                                            echo '<option value="' .

                                                $counter .

                                                '" ' .

                                                $selectedprior .

                                                ">" .

                                                $counter .

                                                "</option>";

                                        }

                                        ?>

                                    </select>

                    </div>



                    <?php //echo "<pre>"; print_r($stmtJobs);
                    
                                //echo "<pre>"; print_r($checkmissingjid);
                    


                                echo "<div class='job-title'>" . getavailablejobtitle($stmtJobs, $checkmissingjid, $userPrior) . "</div>"; ?>



                    </th>

                    <?php

                                }

                            } else {

                                echo "No records found.";

                            } ?>
            <th>Total</th>
            </tr>

            </thead>

            <tbody>

                <?php if ($getUniquedates) {

                    foreach ($getUniquedates as $stmtPostDate) { ?>



                        <tr>

                            <td> <input type="date" id="startDate" name="startDate" class="startDate" value="<?php echo $stmtPostDate[

                                "date"

                            ]; ?>" required>

                                <span class="error-message" style="color: red; display: none;">Required field</span>
                            </td>

                            <?php foreach ($userRows as $userRow) {



                                $currentdate = date("Y-m-d");



                                $jobPostStatus = getStatussByDateIid(

                                    $stmtPostDates,

                                    $stmtPostDate["date"],

                                    $userRow["uid"]

                                );



                                if ($jobPostStatus['status'] == 0) {

                                    $jobactivestatus = "close";

                                }

                                if ($jobPostStatus['status'] == 1) {

                                    $jobactivestatus = "post";

                                }

                                if ($jobPostStatus['status'] == 2) {

                                    $jobactivestatus = "active";

                                }

                                ?>



                                <td class="<?php echo $jobactivestatus; ?>">

                                    <?php

                                    if ($jobPostStatus['status'] == 1 && $stmtPostDate["date"] == $currentdate) { ?>

                                        <input type="checkbox" id="postJob" name="postJob" class="postJob"
                                            onchange="postJobUpdateStatus(this)"> Post

                                    <?php }

                                    if ($jobPostStatus['status'] == 2) { ?>

                                        <input type="checkbox" id="closejob" name="closejob" class="closejob"
                                            onchange="CloseActiveJobpost(this)"> Close

                                        <?php

                                        $date = date("Y-m-d");

                                        $current_time = date('H:i:s');

                                        $current_day = date('D');

                                        $updatelinkedinsheetstart = '';

                                        $Updateleadmorethanyesterday = date("Y-m-d", strtotime($date . " -1 day"));

                                        if ($stmtPostDate["date"] < $Updateleadmorethanyesterday) {

                                            $updatelinkedinsheetstart = '00:00:00';

                                        }

                                        if ($stmtPostDate["date"] == $Updateleadmorethanyesterday) {

                                            $updatelinkedinsheetstart = '21:00:00';

                                        }

                                        if ($current_day == 'Sun') {

                                            $updatelinkedinsheetstart = '20:00:00';

                                        }

                                        $userInfo = sendJobtitleonwhatapp($userRow["uid"], $userRows);

                                        //echo "<pre>";
                    
                                        //print_r($userRows);
                    
                                        if ($stmtPostDate["date"] < $date && $updatelinkedinsheetstart < $current_time) {

                                            $phoneNumber = "+91" . $userInfo["phonenumber"];

                                            $message = "Hi " . $userInfo["Name"] . ",\n";

                                            $message .= "Good evening\n";

                                            $message .= "Kindly close your job post at your earliest convenience. If it has already been closed, please share a screenshot at your earliest convenience and proceed with posting the new job with the title shared in the group.";

                                            $whatsappLink = "https://wa.me/$phoneNumber?text=" . urlencode($message);

                                            $skype_link =

                                                "skype:live:.cid.145bac2a1f10e03a?chat&text=" . urlencode($message);

                                            echo '<a href="' . $whatsappLink . '" target="_blank">Close Job WhatsApp</a>';

                                            echo '&nbsp;&nbsp;&nbsp;<a href="' .

                                                $skype_link .

                                                '" target="_blank">Close Job Skype</a>&nbsp;&nbsp;&nbsp;';

                                        }



                                    }

                                    if ($stmtPostDate["date"] != $currentdate) {



                                        ?>



                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" id="updateapplicants" name="updateapplicants"
                                            class="updateapplicants" value="<?php echo $jobPostStatus["leadcount"]; ?>"
                                            oninput="UpdateLeadsComments(this)">

                                        <?php

                                        $date = date("Y-m-d");

                                        $current_time = date('H:i:s');

                                        $updatelinkedinsheetstart = '';

                                        $Updateleadmorethanyesterday = date("Y-m-d", strtotime($date . " -1 day"));

                                        if ($stmtPostDate["date"] < $Updateleadmorethanyesterday) {

                                            $updatelinkedinsheetstart = '00:00:00';

                                        }

                                        if ($stmtPostDate["date"] == $Updateleadmorethanyesterday) {

                                            $updatelinkedinsheetstart = '21:00:00';

                                        }

                                        $userInfo = sendJobtitleonwhatapp($userRow["uid"], $userRows);

                                        //if($jobPostStatus["leadcount"] =='' && $stmtPostDate["date"] < $Updateleadmorethanyesterday){
                    
                                        if ($jobPostStatus["leadcount"] == '' && $updatelinkedinsheetstart < $current_time) {

                                            $phoneNumber = "+91" . $userInfo["phonenumber"];

                                            $message = "Hi " . $userInfo["Name"] . ",\n";

                                            $message .= "Good evening\n";

                                            $message .= "Please update your LinkedIn sheet at your earliest convenience. Any delays in updating the sheet may impact productivity. Kindly ensure the information is verified before submission.";

                                            $whatsappLink = "https://wa.me/$phoneNumber?text=" . urlencode($message);

                                            $skype_link =

                                                "skype:live:.cid.145bac2a1f10e03a?chat&text=" . urlencode($message);

                                            echo '&nbsp;&nbsp;&nbsp;<a href="' . $whatsappLink . '" target="_blank">Update leads - WhatsApp</a>';

                                            echo '&nbsp;&nbsp;&nbsp;<a href="' .

                                                $skype_link .

                                                '" target="_blank">Update leads - Skype</a>&nbsp;&nbsp;&nbsp;';

                                        }

                                    }

                                    $disbledtitleforolderjob = date("Y-m-d", strtotime($date . " -1 day"));

                                    $current_time = date('H:i:s');

                                    $disbledtitleforolderjobtime = '20:00:00';

                                    $stmtPostDate["date"];

                                    $jobpostedDate = $stmtPostDate["date"];



                                    if ($jobpostedDate < $disbledtitleforolderjob) {



                                        $disabledtitile = 'disabled';



                                    } else {

                                        if ($current_time >= $disbledtitleforolderjobtime) {

                                            $disabledtitile = 'disabled';

                                        } else {

                                            $disabledtitile = '';

                                        }

                                        // Enable the select field if the date is not older than two days
                    
                                    }

                                    if ($stmtPostDate["date"] >= $date) {

                                        $disabledtitile = '';

                                    } ?>

                                    <select name="jobtitle" id="jobtitle" onchange="sendData(this)" data="<?php echo $userRow[

                                        "uid"

                                    ]; ?>" <?php echo $disabledtitile; ?>>



                                        <option value="0">S</option>

                                        <?php

                                        if ($stmtJobs) {

                                            foreach ($stmtJobs as $stmtJob) {

                                                $selectedtitle = "";

                                                $getJIDsByDateIid = getJIDsByDateIid(

                                                    $stmtPostDates,

                                                    $stmtPostDate["date"],

                                                    $userRow["uid"]

                                                );

                                                if ($getJIDsByDateIid == $stmtJob["jobid"]) {

                                                    $selectedtitle = "selected";

                                                }



                                                echo '<option value="' .

                                                    $stmtJob["jobid"] .

                                                    '" ' .

                                                    $selectedtitle .

                                                    ">" .

                                                    $stmtJob["title"] .

                                                    "</option>";

                                            }

                                        } else {

                                            echo "No records found.";

                                        } ?>

                                    </select>



                                    <?php

                                    //date_default_timezone_set('Asia/Kolkata');
                    
                                    $date = date("Y-m-d");

                                    $current_time = date('H:i:s');

                                    $updatelinkedinsheetstart = '21:00:00';

                                    $userInfo = sendJobtitleonwhatapp($userRow["uid"], $fetCurrentDatetitle_Uname);

                                    //$Userstatuspostjob = getStatussByDateIid($fetCurrentDatetitle_Uname,  $date, $userRow["uid"]);
                    
                                    //echo "<pre>"; print_r($jobPostStatus);
                    
                                    if ($stmtPostDate["date"] == $date && $jobPostStatus['status'] == 1 && $current_time > $updatelinkedinsheetstart) {

                                        $phoneNumber = "+91" . $userInfo["phonenumber"];

                                        $message = $userInfo["title"];

                                        $whatsappLink = "https://wa.me/$phoneNumber?text=" . urlencode($message);

                                        $skype_link =

                                            "skype:live:.cid.145bac2a1f10e03a?chat&text=" . urlencode($message);

                                        echo '<a href="' . $whatsappLink . '" target="_blank">WhatsApp</a>';

                                        echo '&nbsp;&nbsp;&nbsp;<a href="' .

                                            $skype_link .

                                            '" target="_blank">Skype</a>&nbsp;&nbsp;&nbsp;';

                                    }

                                    ?>

                                    <?php if ($stmtPostDate["date"] == $currentdate) { ?>

                                        <button type="button" onclick="copyJobTitleCurrentDate(event)">Copy Title</button>

                                        <div id="message"></div>

                                    <?php } ?>

                                </td>

                                <!--<td><div class="result"></div></td>-->

                                <?php

                            } ?>

                            <td>
                                <div class="result"><?php

                                $countTotalPerDate = countTotalPerDate($stmtPostDates, $stmtPostDate['date']);

                                echo $countTotalPerDate[$stmtPostDate['date']];

                                ?></div>
                            </td>
                        </tr>

                    <?php }

                } else {

                    echo "No records found.";

                } ?>



            </tbody>

            </table>
            </div>

            <input class="form-submission" type="submit" value="Add Job Titles">

            <?php

            $message = "";

            if ($fetCurrentDatetitle_Uname) {

                foreach ($fetCurrentDatetitle_Uname as $fetCurrentDatetitles_Unames) {

                    $message .=

                        $fetCurrentDatetitles_Unames["Name"] .

                        " - " .

                        $fetCurrentDatetitles_Unames["title"] .

                        "\n";

                }

                $message .= "Hello Everyone,\n

Please post the job with the respective title mentioned above. Once completed, kindly provide a screenshot as confirmation.";

                $encoded_message = urlencode($message); // Create the WhatsApp link with the encoded message
        
                $link = "https://wa.me/?text=" . $encoded_message; // Output the WhatsApp share link as a clickable button
        
                echo '<p class="whasttitlesshare"><a href="' . $link . '" target="_blank">Send Job Title on WhatsApp</a></p>';

            } ?>

        </form>

        <?php

        date_default_timezone_set('Asia/Kolkata');

        $current_time = date('H:i:s'); // Format: Year-Month-Day Hour:Minute:Second
    
        $updatelinkedinsheetstart = '18:00:00';

        $updatelinkedinsheetstartend = '20:00:00';

        $closeJobFirstStart = '20:00:00';

        $closeJobFirstEnd = '20:30:00';

        $closeJobSecStart = '20:30:00';

        $closeJobSecEnd = '21:00:00';

        $attendanceStart = '22:00:00';

        $attendanceEnd = '23:00:00';

        if (($current_time >= $updatelinkedinsheetstart && $current_time <= $updatelinkedinsheetstartend)) {

            $updatelinkedinsheetmessage = "Hello everyone,\n";

            $updatelinkedinsheetmessage .= "Good evening\n";

            $updatelinkedinsheetmessage .= "Please update your LinkedIn sheet at your earliest convenience. Any delays in updating the sheet may impact productivity. Kindly ensure the information is verified before submission.";

            $encoded_updatelinkedinsheetmessage = urlencode($updatelinkedinsheetmessage); // Create the WhatsApp link with the encoded message
    
            $linkpdatelinkedinsheet = "https://wa.me/?text=" . $encoded_updatelinkedinsheetmessage; // Output the WhatsApp share link as a clickable button
    
            echo '<p class="whastmessagesshare"><a href="' . $linkpdatelinkedinsheet . '" target="_blank">Send LinkedIn sheet update WhatsApp</a></p>';

        }

        if (($current_time >= $closeJobFirstStart && $current_time <= $closeJobFirstEnd)) {

            $closeJobFirstmessage = "Hello everyone,\n";

            $closeJobFirstmessage .= "Kindly ensure that the job post is closed before 9 PM and send a screenshot as confirmation.";

            $encoded_closeJobFirstmessage = urlencode($closeJobFirstmessage); // Create the WhatsApp link with the encoded message
    
            $linkcloseJobFirst = "https://wa.me/?text=" . $encoded_closeJobFirstmessage; // Output the WhatsApp share link as a clickable button
    
            echo '<p class="whastmessagesshare"><a href="' . $linkcloseJobFirst . '" target="_blank">Send LinkedIn close Job first message WhatsApp</a></p>';

        }

        if (($current_time >= $closeJobSecStart && $current_time <= $closeJobSecEnd)) {

            $closeJobSecmessage = "Hello everyone,\n";

            $closeJobSecmessage .= "Kindly close the job post before 9 PM without any delay. Everyone must adhere to this timeline to avoid any impact on productivity and send a screenshot as confirmation.";

            $encoded_closeJobSecmessage = urlencode($closeJobSecmessage); // Create the WhatsApp link with the encoded message
    
            $linkcloseJobSec = "https://wa.me/?text=" . $encoded_closeJobSecmessage; // Output the WhatsApp share link as a clickable button
    
            echo '<p class="whastmessagesshare"><a href="' . $linkcloseJobSec . '" target="_blank">Send LinkedIn close Job Second message WhatsApp</a></p>';

        }

        if (($current_time >= $attendanceStart && $current_time <= $attendanceEnd)) {

            $attendancemessage = "Hello everyone,\n";

            $attendancemessage .= "Please ensure you mark your attendance promptly to avoid any delays in the completion of your internship.\n If you forgot to log your hours yesterday, make sure to post them. You can only log hours for yesterday and today.";

            $encoded_attendancemessage = urlencode($attendancemessage); // Create the WhatsApp link with the encoded message
    
            $linkattendance = "https://wa.me/?text=" . $encoded_attendancemessage; // Output the WhatsApp share link as a clickable button
    
            echo '<p class="whastmessagesshare"><a href="' . $linkattendance . '" target="_blank">Send attendance log message WhatsApp</a></p>';

        }

        ?>



        <div>

        </div>

        <?php

    } catch (PDOException $e) {

        // Handle any errors with the query
    
        echo "Error: " . $e->getMessage();

    }

    function getJIDsByDateIid($data, $targetDate, $targetuid)
    {

        $jids = [];

        foreach ($data as $entry) {

            if ($entry["date"] === $targetDate && $entry["uid"] === $targetuid) {

                $jids = $entry["jid"];

            }

        }

        return $jids;

    }

    function getStatussByDateIid($data, $targetDate, $targetuid)
    {

        foreach ($data as $entry) {

            if ($entry["date"] === $targetDate && $entry["uid"] === $targetuid) {

                //$status = $entry["status"];
    
                return [

                    "status" => $entry["status"],

                    "leadcount" => $entry["leadcount"]

                ];

            }

        }

        return null;

    }

    function filterByUID($data, $uid)
    {

        $filtered = [];

        $unique_dates = array_unique(array_column($data, "date")); // Get unique dates
    
        rsort($unique_dates); // Sort in descending order (latest date first)
    
        // Get the last 3 unique dates
    
        $last_3_dates = array_slice($unique_dates, 0, 7);

        foreach ($data as $entry) {

            if ($entry["uid"] == $uid && in_array($entry["date"], $last_3_dates)) {

                $filtered[] = $entry; // Add the entry if both conditions match
    
            }

        }

        return $filtered;

    }

    function checkMissingNumbers($data, $start, $end)
    {

        // Extract all 'jid' values from the data array
    
        $jids = array_column($data, "jid"); // Find the expected range of jids
    
        $expected = range($start, $end); // Get the missing jids by comparing the expected range and the actual jids
    
        $missing = array_diff($expected, $jids);

        return $missing;

    }

    /*function getavailablejobtitle($jobs, $second_array){

        $second_array = array_slice($second_array, 0); // Loop through the second array and find the matching jobid

        foreach ($second_array as $jid) {

            foreach ($jobs as $job) {

                if ($job["jobid"] === $jid) {

                    echo "<p>" . $job["jobid"] . ".&nbsp;" . $job["title"] . "</p>";

                    // Output the title

                    echo "\n";

                }

            }

        }

    }*/

    function getAvailableJobTitle($jobs, $second_array, $expandClappse)
    {

        // Initialize variables to store job data for 'top' and 'bottom' classes
    
        $topJobs = [];

        $bottomJobs = [];



        // Loop through the second array of job ids
    
        foreach ($second_array as $jid) {

            // Find the job in the jobs array based on jobid
    
            foreach ($jobs as $job) {

                if ($job["jobid"] === $jid) {

                    // Group jobs based on their jobid
    
                    if ($jid < 9) {

                        $topJobs[] = $job;  // Add to top if jobid is less than 9
    
                    } else {

                        $bottomJobs[] = $job;  // Add to bottom if jobid is 9 or greater
    
                    }

                }

            }

        }



        // Output the 'top' jobs without an expand button if jobid < 9
    
        if (!empty($topJobs)) {

            if ($expandClappse > 8) {

                echo "<button onclick='toggleSection(event, \"topSection\")' id='topToggleButton' >Expand Top</button>";

                $hidetop = "style='display:none;'";

            }

            echo "<div class='top' id='topSection' $hidetop>";  // Always open for jobid < 9
    
            foreach ($topJobs as $job) {

                echo "<p>" . $job["jobid"] . ".&nbsp;" . $job["title"] . "</p>";

            }

            echo "</div>";

        }



        // Output the 'bottom' jobs with collapse functionality if jobid >= 9
    
        if (!empty($bottomJobs)) {

            if ($expandClappse < 9) {

                echo "<button onclick='toggleSection(event, \"bottomSection\")' id='bottomToggleButton' >Expand Bottom</button>";

                $hidebottom = "style='display:none;'";

            }

            echo "<div class='bottom' id='bottomSection' $hidebottom>";  // default collapsed
    
            foreach ($bottomJobs as $job) {

                echo "<p>" . $job["jobid"] . ".&nbsp;" . $job["title"] . "</p>";

            }

            echo "</div>";

        }

    }





    function sendJobtitleonwhatapp($userId, $users)
    {

        foreach ($users as $user) {

            if ($user["uid"] == $userId) {

                // Return the phonenumber and title for the matching userId
    
                return [

                    "phonenumber" => $user["phonenumber"],

                    "title" => $user["title"],

                    "Name" => $user["Name"],

                ];

            }

        } // If userId is not found
    
        return null;

    }

    function countTotalPerDate($data, $match_date)
    {

        $dateSum = [];

        foreach ($data as $entry) {

            $leadcount = isset($entry['leadcount']) && is_numeric($entry['leadcount']) ? $entry['leadcount'] : 0;

            if ($entry['date'] !== $match_date) {

                continue; // Skip if the date doesn't match
    
            }

            if (!isset($dateSum[$entry['date']])) {

                $dateSum[$entry['date']] = 0;

            }

            $dateSum[$entry['date']] += $leadcount;

        }

        return $dateSum;

    }

    ?>

    <script>

        function sendData(jobsBoard) {

            var tr = jobsBoard.closest('tr');

            var td = jobsBoard.closest('td');

            var dateValue = tr.querySelector('.startDate') ? tr.querySelector('.startDate').value : 'No date selected';

            var errorMessage = tr.querySelector('.error-message'); // Find the error message element

            if (dateValue === "") {

                errorMessage.style.display = 'inline';

                return false; // Prevent form submission or further processing

            } else {

                errorMessage.style.display = 'none';

            }

            var isChecked = td.querySelector('.closejob') ? td.querySelector('.closejob').checked : 0;

            var jobpoststatus = (isChecked ? "1" : "0");

            var selectedJobTitle = jobsBoard.options[jobsBoard.selectedIndex].value;

            var userId = jobsBoard.getAttribute('data');

            var result = "Date: " + convertDateFormat(dateValue) + "<br>" +

                "Close Job Checked: " + (isChecked ? "Yes" : "No") + "<br>" +

                "Selected Job Title: " + selectedJobTitle;

            console.log(result);

            const data = {

                date: dateValue,

                jobId: selectedJobTitle,

                Jobstatus: jobpoststatus,

                uId: userId

            };

            var xhr = new XMLHttpRequest();

            xhr.open("POST", "process.php", true);

            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {

                if (xhr.status === 200) {

                    var response = JSON.parse(xhr.responseText);

                    //document.getElementById('response').innerHTML = `Response from PHP: ${response.message}`;

                    window.location.href = window.location.href;

                } else {

                    document.getElementById('response').innerHTML = 'Error sending data.';

                }

            };



            xhr.send(JSON.stringify(data));

        }

        function jobBoardtUserpriority(Usesjobrpriority) {



            var selectedjobUserprior = Usesjobrpriority.options[Usesjobrpriority.selectedIndex].value;

            var userId = Usesjobrpriority.getAttribute('data');

            var result = "User priority" + selectedjobUserprior +

                "user ID: " + userId;

            console.log(result);

            const data = {

                usejobprior: selectedjobUserprior,

                uId: userId

            };

            var xhr = new XMLHttpRequest();

            xhr.open("POST", "userpriorityupdate.php", true);

            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {

                if (xhr.status === 200) {

                    // Parse and display the response from PHP

                    //var response = JSON.parse(xhr.responseText);

                    //document.getElementById('response').innerHTML = `Response from PHP: ${response.message}`;

                    location.reload();

                } else {

                    document.getElementById('response').innerHTML = 'Error sending data.';

                }

            };

            xhr.send(JSON.stringify(data));

        }

        function convertDateFormat(dateString) {

            const dateParts = dateString.split('-');

            return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

        }

        function CloseActiveJobpost(CloseActiveJob) {

            var tr = CloseActiveJob.closest('tr');

            var td = CloseActiveJob.closest('td');

            var select = td.querySelector('select');

            var dateValue = tr.querySelector('.startDate') ? tr.querySelector('.startDate').value : 'No date selected';

            var errorMessage = tr.querySelector('.error-message'); // Find the error message element



            if (dateValue === "") {

                errorMessage.style.display = 'inline';

                return false; // Prevent form submission or further processing

            } else {

                errorMessage.style.display = 'none';

            }

            var isChecked = td.querySelector('.closejob') ? td.querySelector('.closejob').checked : 0;

            var jobpoststatus = (isChecked ? "1" : "0");

            var selectedJobTitle = select.options[select.selectedIndex].value;;

            var userId = select.getAttribute('data');

            var result = "NewDate: " + convertDateFormat(dateValue) + "<br>" +

                "Close Job Checked: " + (isChecked ? "Yes" : "No") + "<br>" +

                "Selected Job Title: " + selectedJobTitle + "user id: " + userId;

            const data = {

                date: dateValue,

                jobId: selectedJobTitle,

                Jobstatus: jobpoststatus,

                uId: userId

            };

            var xhr = new XMLHttpRequest();

            xhr.open("POST", "closejobpoststatus.php", true);

            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {

                if (xhr.status === 200) {

                    // Parse and display the response from PHP

                    var response = JSON.parse(xhr.responseText);

                    //document.getElementById('response').innerHTML = `Response from PHP: ${response.message}`;

                    location.reload();

                } else {

                    document.getElementById('response').innerHTML = 'Error sending data.';

                }

            };

            xhr.send(JSON.stringify(data));

        }

        function postJobUpdateStatus(postJobUpdate) {

            var tr = postJobUpdate.closest('tr');

            var td = postJobUpdate.closest('td');

            var select = td.querySelector('select');

            var dateValue = tr.querySelector('.startDate') ? tr.querySelector('.startDate').value : 'No date selected';

            var errorMessage = tr.querySelector('.error-message'); // Find the error message element

            if (dateValue === "") {

                errorMessage.style.display = 'inline';

                return false; // Prevent form submission or further processing

            } else {

                errorMessage.style.display = 'none';

            }

            var isChecked = td.querySelector('.closejob') ? td.querySelector('.closejob').checked : 0;

            var jobpoststatus = (isChecked ? "1" : "0");

            var selectedJobTitle = select.options[select.selectedIndex].value;

            var userId = select.getAttribute('data');

            var result = "NewDate: " + convertDateFormat(dateValue) + "<br>" +

                "Close Job Checked: " + (isChecked ? "Yes" : "No") + "<br>" +

                "Selected Job Title: " + selectedJobTitle + "user id: " + userId;

            const data = {

                date: dateValue,

                jobId: selectedJobTitle,

                Jobstatus: jobpoststatus,

                uId: userId

            };

            var xhr = new XMLHttpRequest();

            xhr.open("POST", "postjobstatusupdate.php", true);

            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {

                if (xhr.status === 200) {

                    // Parse and display the response from PHP

                    var response = JSON.parse(xhr.responseText);

                    //document.getElementById('response').innerHTML = `Response from PHP: ${response.message}`;

                    location.reload();

                } else {

                    document.getElementById('response').innerHTML = 'Error sending data.';

                }

            };

            xhr.send(JSON.stringify(data));

        }

        function copyJobTitleCurrentDate(event) {

            event.preventDefault();

            var button = event.target;

            var td = button.closest('td');

            var select = td.querySelector('select');

            if (select) {

                var selectedJobTitle = select.options[select.selectedIndex].text;

                console.log(selectedJobTitle);

                var tempInput = document.createElement("input");

                tempInput.value = selectedJobTitle; // Set the value of the input to the selected job title

                document.body.appendChild(tempInput);

                tempInput.select();

                tempInput.setSelectionRange(0, 99999); // For mobile devices

                document.execCommand("copy");

                document.body.removeChild(tempInput);

                var messageElement = document.createElement('p');

                messageElement.innerText = "Title Copied: " + selectedJobTitle;

                td.appendChild(messageElement);

                setTimeout(function () {

                    messageElement.remove(); // Delete the message element

                }, 5000);

            } else {

                console.log("No select element found.");

            }

        }

        function UpdateLeadsComments(input) {

            var leadscounts = input.value;

            console.log('Updated Value:', input.value);

            var tr = input.closest('tr');

            var td = input.closest('td');

            var select = td.querySelector('select');

            var dateValue = tr.querySelector('.startDate') ? tr.querySelector('.startDate').value : 'No date selected';

            var errorMessage = tr.querySelector('.error-message');

            if (dateValue === "") {

                errorMessage.style.display = 'inline';

                return false; // Prevent form submission or further processing

            } else {

                errorMessage.style.display = 'none';

            }

            var isChecked = td.querySelector('.closejob') ? td.querySelector('.closejob').checked : 0;

            var jobpoststatus = (isChecked ? "1" : "0");

            var selectedJobTitle = select.value;

            var userId = select.getAttribute('data');

            var result = "NewDate: " + convertDateFormat(dateValue) + "<br>" +

                "Close Job Checked: " + (isChecked ? "Yes" : "No") + "<br>" +

                "Selected Job Title: " + selectedJobTitle + "user id: " + userId;

            const data = {

                date: dateValue,

                jobId: selectedJobTitle,

                leadscount: leadscounts,

                uId: userId

            };

            var xhr = new XMLHttpRequest();

            xhr.open("POST", "updateleadscount.php", true);

            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {

                if (xhr.status === 200) {

                    var response = JSON.parse(xhr.responseText);

                    document.getElementById('response').innerHTML = `Response from PHP: ${response.message}`;

                    location.reload();

                } else {

                    document.getElementById('response').innerHTML = 'Error sending data.';

                }

            };

            xhr.send(JSON.stringify(data));

        }

        function sumInputs() {

            let inputs = document.querySelectorAll('.updateapplicants');

            let total = 0;



            inputs.forEach(input => {

                // Parse the value to an integer and add it to total

                total += parseInt(input.value) || 0; // In case of empty or invalid input, treat as 0

            });



            // Display the result

            document.getElementById('result').textContent = "Total: " + total;

        }

        let lastExpandedSection = null;

        function toggleSection(event, sectionId) {

            event.preventDefault();

            const button = event.target;



            // Find the closest <th> element to the button

            const thElement = button.closest('th');



            // Find the section (bottom div) within the same <th>

            const section = thElement.querySelector(`#${sectionId}`);



            // If there's a previously expanded section and it's not the current one, collapse it

            if (lastExpandedSection && lastExpandedSection !== section) {

                lastExpandedSection.style.display = "none";

                const lastButton = lastExpandedSection.previousElementSibling.querySelector('button');

                if (lastButton) {

                    lastButton.textContent = "Expand Bottom";

                }

            }



            // Toggle the display of the current section

            if (section.style.display === "none" || section.style.display === "") {

                section.style.display = "block";

                button.textContent = "Collapse Bottom";



                // Update the last expanded section

                lastExpandedSection = section;

            } else {

                section.style.display = "none";

                button.textContent = "Expand Bottom";



                // Reset the last expanded section

                lastExpandedSection = null;

            }

        }

    </script>

</body>

</html>
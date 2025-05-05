


<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
$phone = $_POST['phone_number'];

// Remove the country code (+1) and format the remaining number
$formatted_phone = preg_replace("/^\+1(\d{3})(\d{3})(\d{4})$/", "$1 $2 $3", $phone);
?>

<input type="text" value="<?php echo $formatted_phone ?>" id="textToCopy">

    <!-- Copy Button -->
    <button id="copyButton" onclick="copyText()">Copy Text</button>

    <p id="statusMessage"></p>
    <?php 
//echo $formatted_phone;  // Outputs: 641 781 0290
}
?>
<script>
        function copyText() {
            var textToCopy = document.getElementById("textToCopy").value;
            
            // Use Clipboard API
            navigator.clipboard.writeText(textToCopy).then(function() {
                document.getElementById("statusMessage").innerHTML = "Text copied to clipboard!";
            }).catch(function(err) {
                console.error('Could not copy text: ', err);
            });
        }
    </script>
<form action="" method="post">
<label>Enter /Paste Phone number </label>
<input type="text"name="phone_number">
<input type="submit" value="Submit">
</form>
<?php

if (isset($_POST['Send']))
{
	$Fname = $_POST['firstName'];
	$Lname = $_POST['lastName'];
	$email = $_POST['Email'];
	$message = $_POST['message'];
	
	$mailTo = "malikfalana@icloud.com";
	$headers = "From: ".$email."CC: somebodyelse@example.com";
	$txt = "You have recieved an e-mail from".$Fname .$Lname.".\n\n".$message;
	
	mail($mailTo, $txt, $message, $headers);
	header("Location:About.html");
}
?>
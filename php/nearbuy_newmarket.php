<?php
session_start();

include('main_connect.php');

if($_POST){
  if(isset($_POST["title"])){
      $title = $_POST["title"];
  }

  if(isset($_POST["additionalinformation"])){
      $additionalinformation = $_POST["additionalinformation"];
  }

  if(isset($_POST["hashtag1"])){
      $hashtag1 = $_POST["hashtag1"];
  }

  if(isset($_POST["hashtag2"])){
      $hashtag2 = $_POST["hashtag2"];
  }

  if(isset($_POST["hashtag3"])){
      $hashtag3 = $_POST["hashtag3"];
  }

  if(isset($_POST["hashtag4"])){
      $hashtag4 = $_POST["hashtag4"];
  }

  if(isset($_POST["hashtag5"])){
      $hashtag5 = $_POST["hashtag5"];
  }

  if(isset($_FILES["image"]["name"])){
      $imagename = $_FILES["image"]["name"];
      $imagetype = $_FILES["image"]["type"];
      $imagesize = $_FILES["image"]["size"];
  }
}
$username = $_SESSION["username"];
$userid = $_SESSION["userid"];

$marketcheck = ("SELECT name FROM markets WHERE name='{$title}'");
$marketcheck = mysqli_query($con, $marketcheck);

if(mysqli_num_rows($marketcheck) > 0)
{
 die('Market name already in use. Please choose a different name.');
}

$imagepath = "../marketbanner/".$imagename;

move_uploaded_file($_FILES["image"]["tmp_name"], $imagepath);

$uploadmarket = $con->prepare("INSERT INTO markets (name, description, image, hashtag1, hashtag2, hashtag3, hashtag4, hashtag5, userid) VALUES ('$title', '$additionalinformation', '$imagepath', '$hashtag1', '$hashtag2', '$hashtag3', '$hashtag4', '$hashtag5', '$userid');");
$uploadmarket->execute();
$uploadmarket = $uploadmarket->get_result();

// echo "";
//
// //uncomment when domain is bought
// // $to      = $email; // Send email to our user
// // $subject = 'Signup | Verification'; // Give the email a subject
// // $message = '
// //
// // Thanks for signing up!
// // Your account has been created, you can login with the following credentials after you have activated your account by pressing the url below.
// //
// // ------------------------
// // Username: '.$username.'
// // ------------------------
// //
// // Please click this link to activate your account:
// // http://www.yourwebsite.com/verify.php?email='.$email.'&hash='.$hash.'
// //
// // '; // Our message above including the link
// //
// // $headers = 'From:noreply@yourwebsite.com' . "\r\n"; // Set from headers
// // mail($to, $subject, $message, $headers); // Send our email

$con->close();
?>

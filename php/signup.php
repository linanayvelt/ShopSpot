<?php

include('main_connect.php');

if($_POST){
  if(isset($_POST["name"])){
      $name = $_POST["name"];
  }

  if(isset($_POST["lastname"])){
      $lastname = $_POST["lastname"];
  }

  if(isset($_POST["username"])){
      $user = $_POST["username"];
  }

  if(isset($_POST["email"])){
      $email = $_POST["email"];
  }

  if(isset($_POST["password"])){
      $password = $_POST["password"];
  }
}

if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
  die("Invalid email address.");
}

$emailcheck = ("SELECT email FROM signup WHERE email='{$email}'");
$emailresult = mysqli_query($con, $emailcheck);

if(mysqli_num_rows($emailresult) > 0)
{
 die('Email already in use.');
}

$usercheck = ("SELECT username FROM signup WHERE username='{$user}'");
$useresult = mysqli_query($con, $usercheck);

if(mysqli_num_rows($useresult) > 0)
{
 die('Username is taken.');
}

$password = password_hash($password, PASSWORD_DEFAULT);

$getmarkets1 = $con->prepare("INSERT INTO signup (username, name, lastname, email, password) VALUES ('$user', '$name', '$lastname', '$email', '$password');");
$getmarkets1->execute();
$getmarkets = $getmarkets1->get_result();

echo "";

//uncomment when domain is bought
// $to      = $email; // Send email to our user
// $subject = 'Signup | Verification'; // Give the email a subject
// $message = '
//
// Thanks for signing up!
// Your account has been created, you can login with the following credentials after you have activated your account by pressing the url below.
//
// ------------------------
// Username: '.$username.'
// ------------------------
//
// Please click this link to activate your account:
// http://www.yourwebsite.com/verify.php?email='.$email.'&hash='.$hash.'
//
// '; // Our message above including the link
//
// $headers = 'From:noreply@yourwebsite.com' . "\r\n"; // Set from headers
// mail($to, $subject, $message, $headers); // Send our email

$con->close();
?>

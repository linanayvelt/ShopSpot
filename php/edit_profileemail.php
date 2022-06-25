<?php
session_start();
include('main_connect.php');

if($_POST){
  if($_POST["email"] !== $_SESSION["email"]){
      $email = $_POST["email"];
  } else {
    die();
  }
  if($_POST["confirmemail"]){
    $confirmemail = $_POST["confirmemail"];
  }
}

$userid = $_SESSION["userid"];

if($email !== $confirmemail){
  die("Emails do not match.");
}

$usercheck = ("SELECT email FROM signup WHERE email='{$email}'");
$useresult = mysqli_query($con, $usercheck);

if(mysqli_num_rows($useresult) > 0)
{
 die('Email is taken.');
}

$getmarkets1 = $con->prepare("UPDATE signup SET email= '{$email}' WHERE userid = '{$userid}';");
$getmarkets1->execute();

$getmarkets1 = $con->prepare("UPDATE signup SET emailconfirmed= '0' WHERE userid = '{$userid}';");
$getmarkets1->execute();

$_SESSION["email"] = $email;

$con->close();

session_destroy();
?>

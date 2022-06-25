<?php
session_start();
include('main_connect.php');

if($_POST){
  if($_POST["username"] !== $_SESSION["username"]){
      $username = $_POST["username"];
  } else {
    die();
  }
}

$userid = $_SESSION["userid"];

// if($email !== $confirmemail){
//   die("Emails do not match.");
// }
//
// if($newpassword !== $confirmnewpassword){
//   die("Passwords do not match.");
// }
$usercheck = ("SELECT username FROM signup WHERE username='{$username}'");
$useresult = mysqli_query($con, $usercheck);

if(mysqli_num_rows($useresult) > 0)
{
 die('Username is taken.');
}

$getmarkets1 = $con->prepare("UPDATE signup SET username = '{$username}' WHERE userid = '{$userid}';");
$getmarkets1->execute();
$getmarkets = $getmarkets1->get_result();

$_SESSION["username"] = $username;

$con->close();
?>

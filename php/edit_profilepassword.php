<?php
session_start();
include('main_connect.php');

if($_POST){
  if($_POST["newpassword"]){
      $password = $_POST["newpassword"];
  } else {
    die();
  }
  if($_POST["confirmnewpassword"]){
    $confirmpassword = $_POST["confirmnewpassword"];
  }
}

$userid = $_SESSION["userid"];

if($password !== $confirmpassword){
  die("Passwords do not match.");
}

$usercheck = ("SELECT password FROM signup WHERE userid='{$userid}'");
$useresult = mysqli_query($con, $usercheck);

$rows = array();
while($r = mysqli_fetch_assoc($useresult)) {
    if(password_verify($password, $r['password'])){
      die('Do not use old passwords. Please come up with a different one.');
    }
}

$password = password_hash($password, PASSWORD_DEFAULT);

$getmarkets1 = $con->prepare("UPDATE signup SET password= '{$password}' WHERE userid = '{$userid}';");
$getmarkets1->execute();

$con->close();

session_destroy();
?>

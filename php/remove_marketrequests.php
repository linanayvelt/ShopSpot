<?php
session_start();
include('main_connect.php');

if($_POST){
  if($_POST["requestid"]){
      $requestid = $_POST["requestid"];
  }
}

$userid = $_SESSION["userid"];

$deleteitemprep = $con->prepare("DELETE FROM requests WHERE userid = ".$userid." AND requestid = ".$requestid."");
$deleteitemprep->execute();

$con->close();
?>

<?php
session_start();
include('main_connect.php');

if($_POST){
  if($_POST["itemid"]){
      $itemid = $_POST["itemid"];
  }
}

$userid = $_SESSION["userid"];

$deleteitemprep = $con->prepare("DELETE FROM items WHERE userid = ".$userid." AND itemid = ".$itemid."");
$deleteitemprep->execute();

$con->close();
?>

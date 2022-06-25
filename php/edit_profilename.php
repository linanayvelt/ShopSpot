<?php
session_start();
include('main_connect.php');

$userid = $_SESSION["userid"];

if($_POST){
  if($_POST["name"] !== $_SESSION["name"]){
      $name = $_POST["name"];
      $getmarkets1 = $con->prepare("UPDATE signup SET name = '{$name}' WHERE userid = '{$userid}';");
      $getmarkets1->execute();
      $getmarkets = $getmarkets1->get_result();
      $_SESSION["name"] = $name;
  }
  if($_POST["lastname"] !== $_SESSION["lastname"]){
      $lastname = $_POST["lastname"];
      $getmarkets1 = $con->prepare("UPDATE signup SET lastname = '{$lastname}' WHERE userid = '{$userid}';");
      $getmarkets1->execute();
      $getmarkets = $getmarkets1->get_result();
      $_SESSION["lastname"] = $lastname;
  }
}

$con->close();
?>

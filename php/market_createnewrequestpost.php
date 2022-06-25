<?php
session_start();
include('main_connect.php');

if($_POST){
  if(isset($_POST["request"])){
      $request = $_POST["request"];
  }
  if(isset($_POST["marketid"])){
      $marketid = $_POST["marketid"];
  }
  if(isset($_POST["requesthashtag1"])){
      $requesthashtag1 = $_POST["requesthashtag1"];
  }
  if(isset($_POST["requesthashtag2"])){
      $requesthashtag2 = $_POST["requesthashtag2"];
  }
  if(isset($_POST["requesthashtag3"])){
      $requesthashtag3 = $_POST["requesthashtag3"];
  }
  if(isset($_POST["requesthashtag4"])){
      $requesthashtag4 = $_POST["requesthashtag4"];
  }
  if(isset($_POST["requesthashtag5"])){
      $requesthashtag5 = $_POST["requesthashtag5"];
  }
}

$username = $_SESSION["username"];
$userid = $_SESSION["userid"];

$getmarkets1 = $con->prepare("INSERT INTO requests (Name, Username, UserID, MarketID, hashtag1, hashtag2, hashtag3, hashtag4, hashtag5) VALUES ('$request', '$username', '$userid', '$marketid', '$requesthashtag1', '$requesthashtag2', '$requesthashtag3', '$requesthashtag4', '$requesthashtag5');");
$getmarkets1->execute();
$getmarkets = $getmarkets1->get_result();

$con->close();
?>

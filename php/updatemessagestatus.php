<?php
session_start();
include('main_connect.php');

if($_POST){
  if($_POST["conversationid"]){
      $conversationid = $_POST["conversationid"];
  }
}

$updatestatus = $con->prepare("UPDATE messages SET readmessage=1 WHERE conversationid = '{$conversationid}'");
$updatestatus->execute();

$updatestatus = $con->prepare("UPDATE chat SET unreadid=0 WHERE conversationid = '{$conversationid}'");
$updatestatus->execute();

$con->close();
?>

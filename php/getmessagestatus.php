<?php
session_start();
include('main_connect.php');

if($_POST){
  if($_POST['statusaction']){
    $statusaction = $_POST['statusaction'];
  }
}

$userid = $_SESSION["userid"];

if($statusaction === "getcon"){
  $getstatusprep = $con->prepare("SELECT unreadid, conversationid FROM chat WHERE userid1 = '{$userid}' OR userid2 = '{$userid}' ORDER BY datenow DESC");
  $getstatusprep->execute();
  $getstatus = $getstatusprep->get_result();

  $rows = array();
  while($r = mysqli_fetch_assoc($getstatus)) {
    if($userid === $r["unreadid"]){
      $r["unreadid"] = 1;
    } else {
      $r["unreadid"] = 0;
    }
      $rows[] = $r;
  }
  print json_encode($rows);
}

if($statusaction === "newcon"){
  if($_POST){
    if($_POST['conversationid']){
      $conversationid = $_POST['conversationid'];
    }
  }
  $getconversationsprep = $con->prepare("SELECT datenow, userid1, userid2, conversationid, subject, unreadid FROM chat WHERE conversationid = '{$conversationid}'");
  $getconversationsprep->execute();
  $getconversations = $getconversationsprep->get_result();

  $rows = array();
  while($r = mysqli_fetch_assoc($getconversations)) {
    $userid = (int)$userid;
    if($userid !== $r["userid1"]){
      $talkingto = $r["userid1"];
      $gettalkingtoprep = $con->prepare("SELECT name, lastname, username FROM signup WHERE userid = '{$talkingto}'");
      $gettalkingtoprep->execute();
      $gettalkingto = $gettalkingtoprep->get_result();
      while($t = mysqli_fetch_assoc($gettalkingto)) {
        $r["talkingto"] = $t["username"];
        $r["name"] = $t["name"];
        $r["lastname"] = $t["lastname"];
      }
    } else if($userid !== $r["userid2"]){
      $talkingto = $r["userid2"];
      $gettalkingtoprep = $con->prepare("SELECT name, lastname, username FROM signup WHERE userid = '{$talkingto}'");
      $gettalkingtoprep->execute();
      $gettalkingto = $gettalkingtoprep->get_result();
      while($t = mysqli_fetch_assoc($gettalkingto)) {
        $r["talkingto"] = $t["username"];
        $r["name"] = $t["name"];
        $r["lastname"] = $t["lastname"];
      }
    }
    if($userid === $r["unreadid"]){
      $r["unreadid"] = 1;
    } else {
      $r["unreadid"] = 0;
    }
      $rows[] = $r;
  }
  print json_encode($rows);
}

$con->close();
?>

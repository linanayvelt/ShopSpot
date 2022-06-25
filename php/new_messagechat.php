<?php
session_start();
include('main_connect.php');

if($_POST){
  if($_POST["message"]){
      $message = $_POST["message"];
  }
  if($_POST["itemid"]){
      $itemid = $_POST["itemid"];
  }
}

$userid1 = $_SESSION["userid"];
$conversationid = 0;

$getuserid2prep = $con->prepare("SELECT userid, name FROM items WHERE itemid = '{$itemid}'");
$getuserid2prep->execute();
$getuserid2 = $getuserid2prep->get_result();

  while($r = mysqli_fetch_assoc($getuserid2)) {
      $userid2 = $r['userid'];
      $subject = $r['name'];
}

$check = "SELECT conversationid FROM chat WHERE (userid1 = '{$userid1}' AND userid2 = '{$userid2}') OR (userid1 = '{$userid2}' AND userid2 = '{$userid1}')";
$getconversationid = mysqli_query($con, $check);

if(mysqli_num_rows($getconversationid) == 0)
{
  $createnewconversationprep = $con->prepare("INSERT INTO chat (userid1, userid2, subject, unreadid) VALUES ('$userid1', '$userid2', '$subject', '$userid2');");
  $createnewconversationprep->execute();
  $createnewconversation = $createnewconversationprep->get_result();
}

$check2 = "SELECT conversationid FROM chat WHERE (userid1 = '{$userid1}' AND userid2 = '{$userid2}') OR (userid1 = '{$userid2}' AND userid2 = '{$userid1}')";
$getconversationidagain = mysqli_query($con, $check);

while($r = mysqli_fetch_assoc($getconversationidagain)) {
    $conversationid = $r['conversationid'];
}

$newmessageprep = $con->prepare("INSERT INTO messages (userid, conversationid, message) VALUES ('$userid1', '$conversationid', '$message');");
$newmessageprep->execute();
$newmessage = $newmessageprep->get_result();

$con->close();
?>

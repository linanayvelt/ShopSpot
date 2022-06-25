<?php
session_start();
include('main_connect.php');

if($_POST){
  if($_POST["changeaction"]){
      $changeaction = $_POST["changeaction"];
  }
}

$userid = $_SESSION["userid"];
$conversationid = 0;

if ($changeaction === "cnv"){
$getconversationsprep = $con->prepare("SELECT datenow, userid1, userid2, conversationid, subject, unreadid FROM chat WHERE userid1 = '{$userid}' OR userid2 = '{$userid}' ORDER BY datenow DESC");
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

if ($changeaction === "showmsg"){
  if($_POST){
    if($_POST["conversationid"]){
        $conversationid = $_POST["conversationid"];
    }
    $getmessagesprep = $con->prepare("SELECT * FROM messages WHERE conversationid = '{$conversationid}'");
    $getmessagesprep->execute();
    $getmessages = $getmessagesprep->get_result();
    $rows = array();
    while($r = mysqli_fetch_assoc($getmessages)) {
        $usernameval = "";
        $getuserid = $r['userid'];
        $check = ("SELECT username FROM signup WHERE userid = '{$getuserid}'");
        $getusername = mysqli_query($con, $check);
        while($t = mysqli_fetch_assoc($getusername)) {
          global $usernameval;
          $usernameval = $t['username'];
        }
        if($usernameval === $_SESSION["username"]){
          $r['senderusername'] = $usernameval;
        }
        if($usernameval !== $_SESSION["username"]){
          $r['receiverusername'] = $usernameval;
        }
        $rows[] = $r;
    }
    print json_encode($rows);
  }
}

if ($changeaction === "sendmsg"){
  if($_POST){
    if($_POST["conversationid"]){
        $conversationid = $_POST["conversationid"];
    }
    if($_POST["message"]){
        $message = $_POST["message"];
    }

    $insertmessage = $con->prepare("INSERT INTO messages (userid, conversationid, message) VALUES ('$userid', '$conversationid', '$message')");
    $insertmessage->execute();
    //
    // $updatetime = $con->prepare("UPDATE chat SET datenow=now() WHERE conversationid = '{$conversationid}'");
    // $updatetime->execute();

    $getconversationsprep = $con->prepare("SELECT userid1, userid2 FROM chat WHERE conversationid = '{$conversationid}'");
    $getconversationsprep->execute();
    $getconversations = $getconversationsprep->get_result();

    $rows = array();
    while($r = mysqli_fetch_assoc($getconversations)) {
      $userid = (int)$userid;
      if($userid !== $r["userid1"]){
        $updatestatus = $con->prepare("UPDATE chat SET unreadid='{$r["userid1"]}', datenow=now() WHERE conversationid = '{$conversationid}'");
        $updatestatus->execute();
      } else if($userid !== $r["userid2"]){
        $updatestatus = $con->prepare("UPDATE chat SET unreadid='{$r["userid2"]}', datenow=now() WHERE conversationid = '{$conversationid}'");
        $updatestatus->execute();
      }
    }
}
}

// $check = "SELECT conversationid FROM chat WHERE (userid1 = '{$userid1}' AND userid2 = '{$userid2}') OR (userid1 = '{$userid2}' AND userid2 = '{$userid1}')";
// $getconversationid = mysqli_query($con, $check);
//
// if(mysqli_num_rows($getconversationid) == 0)
// {
//   $createnewconversationprep = $con->prepare("INSERT INTO chat (userid1, userid2, subject) VALUES ('$userid1', '$userid2', '$subject');");
//   $createnewconversationprep->execute();
//   $createnewconversation = $createnewconversationprep->get_result();
// }
//
// $check2 = "SELECT conversationid FROM chat WHERE (userid1 = '{$userid1}' AND userid2 = '{$userid2}') OR (userid1 = '{$userid2}' AND userid2 = '{$userid1}')";
// $getconversationidagain = mysqli_query($con, $check);
//
// while($r = mysqli_fetch_assoc($getconversationidagain)) {
//     $conversationid = $r['conversationid'];
// }
//
// $newmessageprep = $con->prepare("INSERT INTO messages (userid, conversationid, message) VALUES ('$userid1', '$conversationid', '$message');");
// $newmessageprep->execute();
// $newmessage = $newmessageprep->get_result();

$con->close();
?>

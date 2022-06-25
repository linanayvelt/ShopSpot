<?php

include('main_connect.php');
session_start();

$username = $_SESSION["username"];
$userid = $_SESSION["userid"];

$getmarkets1 = $con->prepare("SELECT datenow, name, userid, requestid, hashtag1, hashtag2, hashtag3, hashtag4, hashtag5 FROM requests WHERE userid = ".$userid."");
$getmarkets1->execute();
$getmarkets = $getmarkets1->get_result();

$rows = array();
while($r = mysqli_fetch_assoc($getmarkets)) {
  $r['username'] = $username;
  $rows[] = $r;
}
print json_encode($rows);

$con->close();
?>

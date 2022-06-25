<?php

include('main_connect.php');

if($_POST){
  if(isset($_POST["marketid"])){
      $marketid = $_POST["marketid"];
  }
}

$getmarkets1 = $con->prepare("SELECT datenow, name, price, quality, description, userid, itemid, image1, image2, image3, hashtag1, hashtag2, hashtag3, hashtag4, hashtag5 FROM items WHERE marketid = ".$marketid."");
$getmarkets1->execute();
$getmarkets = $getmarkets1->get_result();

$rows = array();
while($r = mysqli_fetch_assoc($getmarkets)) {
  $usernameval = "";
  $getuserid = $r['userid'];
  $check = ("SELECT username FROM signup WHERE userid = '{$getuserid}'");
  $getusername = mysqli_query($con, $check);
  while($t = mysqli_fetch_assoc($getusername)) {
    global $usernameval;
    $usernameval = $t['username'];
  }
  $r['username'] = $usernameval;
  $rows[] = $r;
}
print json_encode($rows);

$con->close();
?>

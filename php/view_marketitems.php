<?php
session_start();
include('main_connect.php');

$userid = $_SESSION["userid"];

$getmarkets1 = $con->prepare("SELECT datenow, name, price, quality, description, userid, itemid, image1, image2, image3, hashtag1, hashtag2, hashtag3, hashtag4, hashtag5 FROM items WHERE userid = ".$userid."");
$getmarkets1->execute();
$getmarkets = $getmarkets1->get_result();

$rows = array();
while($r = mysqli_fetch_assoc($getmarkets)) {
    $rows[] = $r;
}
print json_encode($rows);

$con->close();
?>

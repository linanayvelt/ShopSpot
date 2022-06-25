<?php

include('main_connect.php');

if($_POST){
  if(isset($_POST["filterValue"])){
      $filterValue = $_POST["filterValue"];
  }
  if(isset($_POST["marketid"])){
      $marketid = $_POST["marketid"];
  }
}

$getmarkets1 = $con->prepare("SELECT name, price, quality, description, userid, itemid, datenow, hashtag1, hashtag2, hashtag3, hashtag4, hashtag5 FROM items WHERE (name LIKE '%".$filterValue."%' OR hashtag1 LIKE '%".$filterValue."%'
                              OR hashtag2 LIKE '%".$filterValue."%' OR hashtag3 LIKE '%".$filterValue."%' OR hashtag4 LIKE '%".$filterValue."%' OR hashtag5 LIKE '%".$filterValue."%')
                              AND marketid = ".$marketid."");
// $getmarkets1->bind_param("s", $filterValue);
$getmarkets1->execute();
$getmarkets = $getmarkets1->get_result();


$rows = array();
while($r = mysqli_fetch_assoc($getmarkets)) {
    $rows[] = $r;
}
print json_encode($rows);

$con->close();
?>

<?php

include('main_connect.php');

if($_POST){
  if(isset($_POST["marketid"])){
      $marketid = $_POST["marketid"];
  }
}

$getmarkets1 = $con->prepare("SELECT * FROM markets WHERE id = ".$marketid."");
$getmarkets1->execute();
$getmarkets = $getmarkets1->get_result();

$rows = array();
while($r = mysqli_fetch_assoc($getmarkets)) {
    $rows[] = $r;
}
print json_encode($rows);

$con->close();
?>

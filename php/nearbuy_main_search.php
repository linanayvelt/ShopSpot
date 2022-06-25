<?php

include('main_connect.php');

if($_POST){
  if(isset($_POST["filterValue"])){
      $filterValue = $_POST["filterValue"];
  }
}

$getmarkets1 = $con->prepare("SELECT * FROM markets WHERE name LIKE '%".$filterValue."%' LIMIT 5");
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

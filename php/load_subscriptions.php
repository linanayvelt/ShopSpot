<?php
session_start();

include('main_connect.php');

$userid = $_SESSION["userid"];

$getsubscriptions = ("SELECT subscriptions FROM signup WHERE userid='{$userid}'");
$getsubscriptions = mysqli_query($con, $getsubscriptions);

$markets_arr = array();
while($r = mysqli_fetch_assoc($getsubscriptions)) {
    $r["subscriptions"] = unserialize($r["subscriptions"]);
    for($i = 0; $i < sizeof($r["subscriptions"]); $i++){
      $getmarket = ("SELECT * FROM markets WHERE id='{$r["subscriptions"][$i]}'");
      $getmarket = mysqli_query($con, $getmarket);
      while($t = mysqli_fetch_assoc($getmarket)) {
        global $markets_arr;
        array_push($markets_arr, $t);
      }
    }
}

print json_encode($markets_arr);
// $markets_arr = array("12", "13", "14");
// $getmarket = ("SELECT * FROM markets WHERE id='{$markets_arr[0]}'");
// $getmarket = mysqli_query($con, $getmarket);
//
// $rows = array();
// while($r = mysqli_fetch_assoc($getmarket)) {
//   $rows[] = $r;
// }
// print json_encode($rows);

$con->close();
?>

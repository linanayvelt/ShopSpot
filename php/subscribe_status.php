<?php
session_start();

include('main_connect.php');

if($_POST){
  if(isset($_POST["marketid"])){
      $marketid = $_POST["marketid"];
  }
}
$userid = $_SESSION["userid"];

$getsubscriptions = ("SELECT subscriptions FROM signup WHERE userid='{$userid}'");
$getsubscriptions = mysqli_query($con, $getsubscriptions);

$subscriptions_arr = array();
while($r = mysqli_fetch_assoc($getsubscriptions)) {
    $r["subscriptions"] = unserialize($r["subscriptions"]);
    global $subscriptions_arr;
    $subscriptions_arr = $r["subscriptions"];
}

print json_encode($subscriptions_arr);

$con->close();
?>

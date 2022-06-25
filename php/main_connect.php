<?php

$servername = 'localhost';
$username = 'root';
$password = 'KwexvAw8sRv4';
$dbname = "generalstore";

// Create connection
$con = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($con->connect_error) {
  // die("Server" + $_SERVER['SERVER_ADDR']);
  die("Connection failed: " . $con->connect_error);
}

// echo "sucess";

//
// if($_POST){
//     if(isset($_POST["marketid"])){
//         $chosenmarket = $_POST["marketid"];
//     }
// }
//
// $combined = "SELECT name, price, category, subdivision, quality, description, userid, username, itemid FROM items WHERE market = '$chosenmarket' ORDER BY subdivision";
// $shows = mysqli_query($con, $combined);
//
// $rows = array();
// while($r = mysqli_fetch_assoc($shows)) {
//     $rows[] = $r;
//
// }
// print json_encode($rows);
//
//
//
//
// $con->close();
?>

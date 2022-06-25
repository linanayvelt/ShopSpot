<?php
include('main_connect.php');
session_start();

if(isset($_SESSION["username"])){
  $username = $_SESSION["username"];
  $name = $_SESSION["name"];
  $lastname = $_SESSION["lastname"];
  $email = $_SESSION["email"];
  $userid = $_SESSION["userid"];

  $return= array('username' => $username, 'name' => $name, 'lastname' => $lastname, 'email' => $email, 'userid' => $userid);
  print json_encode($return);
}
?>

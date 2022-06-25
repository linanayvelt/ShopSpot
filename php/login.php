<?php
session_start();
include('main_connect.php');

if($_POST){
  if(isset($_POST["usernameoremail"])){
      $usernameoremail = $_POST["usernameoremail"];
  }

  if(isset($_POST["loginpassword"])){
      $loginpassword = $_POST["loginpassword"];
  }
}

$check = ("SELECT username, name, lastname, email, password, emailconfirmed, userid FROM signup WHERE email='{$usernameoremail}' OR username='{$usernameoremail}'");
$checkresult = mysqli_query($con, $check);

if(mysqli_num_rows($checkresult) == 0)
{
 die('Incorrect username or email.');
}

$rows = array();
while($r = mysqli_fetch_assoc($checkresult)) {
    if(!$r['emailconfirmed']){
      die('Please confirm email.');
    }

    if(!password_verify($loginpassword, $r['password'])){
      die('Incorrect Password');
    }

    $_SESSION["username"] = $r['username'];
    $_SESSION["name"] = $r['name'];
    $_SESSION["lastname"] = $r['lastname'];
    $_SESSION["email"] = $r['email'];
    $_SESSION["userid"] = $r['userid'];
}

$con->close();
?>

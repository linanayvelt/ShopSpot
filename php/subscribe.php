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

array_push($subscriptions_arr, $marketid);
$subscriptions_str = serialize($subscriptions_arr);

$addsubscription = $con->prepare("UPDATE signup SET subscriptions = '{$subscriptions_str}' WHERE userid = '{$userid}'");
$addsubscription->execute();

$updatesubscribers = $con->prepare("UPDATE markets SET subscribers = subscribers + 1 WHERE id = '{$marketid}'");
$updatesubscribers->execute();

// if(mysqli_num_rows($marketcheck) > 0)
// {
//  die('Market name already in use. Please choose a different name.');
// }
//
// $imagepath = "../marketbanner/".$imagename;
//
// move_uploaded_file($_FILES["image"]["tmp_name"], $imagepath);
//
// $uploadmarket = $con->prepare("INSERT INTO markets (name, description, image, hashtag1, hashtag2, hashtag3, hashtag4, hashtag5, userid) VALUES ('$title', '$additionalinformation', '$imagepath', '$hashtag1', '$hashtag2', '$hashtag3', '$hashtag4', '$hashtag5', '$userid');");
// $uploadmarket->execute();
// $uploadmarket = $uploadmarket->get_result();

// echo "";
//
// //uncomment when domain is bought
// // $to      = $email; // Send email to our user
// // $subject = 'Signup | Verification'; // Give the email a subject
// // $message = '
// //
// // Thanks for signing up!
// // Your account has been created, you can login with the following credentials after you have activated your account by pressing the url below.
// //
// // ------------------------
// // Username: '.$username.'
// // ------------------------
// //
// // Please click this link to activate your account:
// // http://www.yourwebsite.com/verify.php?email='.$email.'&hash='.$hash.'
// //
// // '; // Our message above including the link
// //
// // $headers = 'From:noreply@yourwebsite.com' . "\r\n"; // Set from headers
// // mail($to, $subject, $message, $headers); // Send our email

$con->close();
?>

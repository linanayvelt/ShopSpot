<?php
session_start();
include('main_connect.php');

if($_POST){
  if(isset($_POST["title"])){
      $title = $_POST["title"];
  }
  if(isset($_POST["price"])){
      $price = $_POST["price"];
  }
  if(isset($_POST["quality"])){
      $quality = $_POST["quality"];
  }
  if(isset($_POST["marketid"])){
      $marketid = $_POST["marketid"];
  }
  if(isset($_POST["additionalinformation"])){
      $additionalinformation = $_POST["additionalinformation"];
  }
  if(isset($_POST["hashtag1"])){
      $hashtag1 = $_POST["hashtag1"];
  }
  if(isset($_POST["hashtag2"])){
      $hashtag2 = $_POST["hashtag2"];
  }
  if(isset($_POST["hashtag3"])){
      $hashtag3 = $_POST["hashtag3"];
  }
  if(isset($_POST["hashtag4"])){
      $hashtag4 = $_POST["hashtag4"];
  }
  if(isset($_POST["hashtag5"])){
      $hashtag5 = $_POST["hashtag5"];
  }
  if(isset($_FILES["image1"]["name"])){
      $image1name = $_FILES["image1"]["name"];
      $image1type = $_FILES["image1"]["type"];
      $image1size = $_FILES["image1"]["size"];
  }
  if(isset($_FILES["image2"]["name"])){
      $image2name = $_FILES["image2"]["name"];
      $image2type = $_FILES["image2"]["type"];
      $image2size = $_FILES["image2"]["size"];
  }
  if(isset($_FILES["image3"]["name"])){
      $image3name = $_FILES["image3"]["name"];
      $image3type = $_FILES["image3"]["type"];
      $image3size = $_FILES["image3"]["size"];
  }
}

$username = $_SESSION["username"];
$userid = $_SESSION["userid"];
$root = $_SERVER["DOCUMENT_ROOT"];
$image1path = "../marketphotos/".$marketid."/".$image1name;
$image2path = "../marketphotos/".$marketid."/".$image2name;
$image3path = "../marketphotos/".$marketid."/".$image3name;

echo $root;

if (!file_exists('../marketphotos/'.$marketid)) {
    mkdir($root . '/marketphotos/' . $marketid, 0775, true);
}

move_uploaded_file($_FILES["image1"]["tmp_name"], $image1path);
move_uploaded_file($_FILES["image2"]["tmp_name"], $image2path);
move_uploaded_file($_FILES["image3"]["tmp_name"], $image3path);

$getmarkets1 = $con->prepare("INSERT INTO items (Name, Price, Marketid, Quality, Description, Username, UserID, Image1, Image2, Image3, hashtag1, hashtag2, hashtag3, hashtag4, hashtag5) VALUES ('$title', '$price', '$marketid', '$quality', '$additionalinformation', '$username', '$userid', '$image1path', '$image2path', '$image3path', '$hashtag1', '$hashtag2', '$hashtag3', '$hashtag4', '$hashtag5');");
$getmarkets1->execute();
$getmarkets = $getmarkets1->get_result();

$con->close();
?>

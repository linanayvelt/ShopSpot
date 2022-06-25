<?php
session_start();
include('main_connect.php');

if($_POST){
  if($_POST["changeaction"]){
      $changeaction = $_POST["changeaction"];
  }
  if($_POST["itemid"]){
      $itemid = $_POST["itemid"];
  }
}

$userid = $_SESSION["userid"];

if($changeaction === "prt"){
  $getmarkets1 = $con->prepare("SELECT datenow, name, price, quality, description, userid, itemid, marketid, image1, image2, image3, hashtag1, hashtag2, hashtag3, hashtag4, hashtag5 FROM items WHERE userid = ".$userid." AND itemid = ".$itemid."");
  $getmarkets1->execute();
  $getmarkets = $getmarkets1->get_result();

  if(mysqli_num_rows($getmarkets) === 0)
  {
   die();
  }

  $rows = array();
  while($r = mysqli_fetch_assoc($getmarkets)) {
    $getmarketnameprep = $con->prepare("SELECT name FROM markets WHERE id = ".$r['marketid']."");
    $getmarketnameprep->execute();
    $getmarketname = $getmarketnameprep->get_result();
    while($t = mysqli_fetch_assoc($getmarketname)) {
      $r["marketname"] = $t["name"];
    }
      $rows[] = $r;
  }
  print json_encode($rows);
}

if($changeaction === "edt"){
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
    if(isset($_FILES["image1"]["name"]) && $_FILES["image1"]["name"] !== ""){
        $image1name = $_FILES["image1"]["name"];
        $image1type = $_FILES["image1"]["type"];
        $image1size = $_FILES["image1"]["size"];
        $image1path = "../marketphotos/".$marketid."/".$image1name;
        move_uploaded_file($_FILES["image1"]["tmp_name"], $image1path);
    } else {
        $image1path = $_POST["oldimage1"];
    }
    if(isset($_FILES["image2"]["name"]) && $_FILES["image2"]["name"] !== ""){
        $image2name = $_FILES["image2"]["name"];
        $image2type = $_FILES["image2"]["type"];
        $image2size = $_FILES["image2"]["size"];
        $image2path = "../marketphotos/".$marketid."/".$image2name;
        move_uploaded_file($_FILES["image2"]["tmp_name"], $image2path);
    } else {
        $image2path = $_POST["oldimage2"];
    }
    if(isset($_FILES["image3"]["name"]) && $_FILES["image3"]["name"] !== ""){
        $image3name = $_FILES["image3"]["name"];
        $image3type = $_FILES["image3"]["type"];
        $image3size = $_FILES["image3"]["size"];
        $image3path = "../marketphotos/".$marketid."/".$image3name;
        move_uploaded_file($_FILES["image3"]["tmp_name"], $image3path);
    } else {
        $image3path = $_POST["oldimage3"];
    }
  }

  $username = $_SESSION["username"];
  $userid = $_SESSION["userid"];

  if (!file_exists('../marketphotos/'.$marketid)) {
      mkdir('../marketphotos/'.$marketid, 0777, true);
  }

// name, price, quality, description, userid, itemid, image1, image2, image3, hashtag1, hashtag2, hashtag3, hashtag4, hashtag5

  $getmarkets1 = $con->prepare("UPDATE items SET name = '{$title}', price = '{$price}', quality = '{$quality}', description = '{$additionalinformation}', image1 = '{$image1path}', image2 = '{$image2path}', image3 = '{$image3path}', hashtag1 = '{$hashtag1}', hashtag2 = '{$hashtag2}', hashtag3 = '{$hashtag3}', hashtag4 = '{$hashtag4}', hashtag5 = '{$hashtag5}' WHERE userid = '{$userid}' AND itemid = '{$itemid}';");
  $getmarkets1->execute();
  $getmarkets = $getmarkets1->get_result();

}

$con->close();
?>

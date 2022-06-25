<?php
session_start();
include('main_connect.php');

if($_POST){
  if($_POST["changeaction"]){
      $changeaction = $_POST["changeaction"];
  }
  if($_POST["requestid"]){
      $requestid = $_POST["requestid"];
  }
}

$userid = $_SESSION["userid"];

if($changeaction === "prt"){
  $getmarkets1 = $con->prepare("SELECT datenow, name, userid, requestid, marketid, hashtag1, hashtag2, hashtag3, hashtag4, hashtag5 FROM requests WHERE userid = '{$userid}' AND requestid = '{$requestid}'");
  $getmarkets1->execute();
  $getmarkets = $getmarkets1->get_result();

  if(mysqli_num_rows($getmarkets) === 0)
  {
   die("");
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
  }

  $username = $_SESSION["username"];
  $userid = $_SESSION["userid"];

  $getmarkets1 = $con->prepare("UPDATE requests SET name = '{$title}', hashtag1 = '{$hashtag1}', hashtag2 = '{$hashtag2}', hashtag3 = '{$hashtag3}', hashtag4 = '{$hashtag4}', hashtag5 = '{$hashtag5}' WHERE userid = '{$userid}' AND requestid = '{$requestid}';");
  $getmarkets1->execute();
  $getmarkets = $getmarkets1->get_result();

}

$con->close();
?>

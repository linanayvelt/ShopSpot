<?php

include('main_connect.php');

$getmarkets = mysqli_query($con,"
SELECT * FROM markets ORDER BY subscribers DESC
");

$rows = array();
while($r = mysqli_fetch_assoc($getmarkets)) {
    $rows[] = $r;
}
print json_encode($rows);

$con->close();
?>

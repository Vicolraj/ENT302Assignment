<?php


// CONNECTING TO DATABASE
$conn = mysqli_connect('localhost', 'root', '', 'StudentAMS') or die("Connection failed: " . mysqli_connect_error());



$email = $_POST['lEmail'];
$pwd = $_POST['lPassword'];//password

// Auth to compare user password if it is correct or match the one in the database
$check = "SELECT * FROM students WHERE `email` = '$email' AND `password` = '$pwd'";
$result = mysqli_query($conn, $check) or die('Unable to fecth data fron database');


$data = null;

while($row = mysqli_fetch_assoc($result)){
    $data[] = $row;
}

echo json_encode($data); 
?>
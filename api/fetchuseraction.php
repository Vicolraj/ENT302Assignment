<?php
// CONNECTING TO DATABASE
$conn = mysqli_connect('localhost', 'root', '', 'StudentAMS') or die("Connection failed: " . mysqli_connect_error());

$email = $_POST['email'];

$table_name = str_replace(array('@', '.', '-'), '_', $email) . "_activities";
$check = "SELECT * FROM $table_name";
$result = mysqli_query($conn, $check) or die('Unable to fecth data from database');


$data = null;

while($row = mysqli_fetch_assoc($result)){
    $data[] = $row;
}

echo json_encode($data); 
?>
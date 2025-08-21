<?php
$conn = mysqli_connect('localhost', 'root', '', 'StudentAMS') or die("Connection failed: " . mysqli_connect_error());

$password = md5($_POST['password']); 
$id = $_POST['id'];

$check = "SELECT * FROM `admin` WHERE id = '$id' AND password = '$password'";
$result = mysqli_query($conn, $check);


if (mysqli_num_rows($result) > 0) {
    
    echo 'true'; 
    
} else {
    echo 'User not found / Incorrect password';      
}


?>
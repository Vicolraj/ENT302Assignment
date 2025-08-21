<?php

$conn = mysqli_connect('localhost', 'root', '', 'StudentAMS') or die("Connection failed: " . mysqli_connect_error());

$fullname = $_POST['fullname'];
$email = $_POST['email'];
$mobileno = $_POST['mobileno'];
$matric = $_POST['matric'];
$password = md5($_POST['password']);

// Check if email already exists
$check = "SELECT * FROM students WHERE email = '$email' OR matric = '$matric'";
$result = mysqli_query($conn, $check);

if (mysqli_num_rows($result) > 0) {
    echo "Email or matric already registered.";
} else {
    $sql = "INSERT INTO students (`fullname`, `email`, `mobileno`, `matric`, `password`) 
    VALUES ('$fullname', '$email', '$mobileno', '$matric', '$password');"; 
    if (mysqli_query($conn, $sql)) {
         echo 'true';
        //  echo 'Account Created Sucessfully';
    } else {
        echo "Error while signing up.";
    }
}

?>

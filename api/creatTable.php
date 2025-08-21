<?php

$conn = mysqli_connect('localhost', 'root', '', 'StudentAMS') or die("Connection failed: " . mysqli_connect_error());

$email = $_POST['email'];

    $table_name = str_replace(array('@', '.', '-'), '_', $email) . "_activities";
    $create = "CREATE TABLE `$table_name` (activity VARCHAR(6) NOT NULL, actiontime VARCHAR(20) NOT NULL);";
    if (mysqli_query($conn, $create)) {
        echo "Signup successful.";
    } else {
        echo "User saved, but activity table not created: " . mysqli_error($conn);
    }
?>

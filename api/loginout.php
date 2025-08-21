<?php

date_default_timezone_set("Africa/Lagos");
// CONNECTING TO DATABASE
$conn = mysqli_connect('localhost', 'root', '', 'StudentAMS') or die("Connection failed: " . mysqli_connect_error());

#RECIEVE ALL POST VALUES 
$email = $_POST['lEmail'];
// $mobileno = $_POST['lMobileNo'];
$password = $_POST['lPassword'];
$action = $_POST['action'];
$action = strtolower($action); 
// Filterign special charater with underscore
$table_name = str_replace(array('@', '.', '-'), '_', $email) . "_activities";
if($action == 'login'){
        $password = md5($password);
    }


// Auth to compare user password if it is correct or match the one in the database
$check = "SELECT * FROM students WHERE email = '$email' AND password = '$password'";
$result = mysqli_query($conn, $check);

function setActiveQuery($boolean, $_email, $pwd){
    return "UPDATE students SET isActive = '$boolean' WHERE email = '$_email' AND password = '$pwd';";
}


if (mysqli_num_rows($result) > 0) {
    
    if($action == 'login'){
        $sql = setActiveQuery('true', $email, $password);
        if (mysqli_query($conn, $sql)) {
            $date = date('Y-m-d H:i:s');
            $create = "INSERT INTO `$table_name` (activity, actiontime) VALUES ('$action', '$date');";
            if(mysqli_query($conn, $create)){
                echo "true $password";
            }else{echo 'Can\'t login';}
                
        } else {
            echo "Can't log activity so \nprogram could not move to login";
        }
    }elseif($action == 'logout'){
        $sql = setActiveQuery('false', $email, $password);
        if (mysqli_query($conn, $sql)) {
            $date = date('Y-m-d H:i:s');
            $create = "INSERT INTO `$table_name` (activity, actiontime) VALUES ('$action', '$date');";
            if(mysqli_query($conn, $create)){
                echo 'true';
            }else{echo 'Can\'t logout';}
                
        } else {
            echo "Can't log activity so program could not move to logout";
        }
    }
    else{
        echo "You can either Login or Logout";
    }
    
   
    
} else {
    echo 'User not found / Incorrect password';    
}


?>


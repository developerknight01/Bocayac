<?php
    include "../../access/conection.php";
    $con = new conection();
    date_default_timezone_set('America/Costa_Rica');    
    ini_set('session.gc_maxlifetime', 86400);
    session_start();

    if(isset($_POST['getPictures'])){
        $res = "";
        $call = "call home_get_pictures();";
        try{
            $data = mysqli_query($con->turnOn(),$call);
            if(mysqli_num_rows($data) > 0){
                while($row = mysqli_fetch_row($data)){
                    $res .= $row[0]."+".$row[1]."*";
                }
            }
            else{
                $res = "fail";
            }
        }
        catch(Exception){
            $res = "error";
        }
        finally{
            $con->turnOff();
        }
        echo $res;
    }
    else if(isset($_POST['getLastProduct'])){
        $res = "";
        $call = "call home_get_last_products();";
        try{
            $data = mysqli_query($con->turnOn(),$call);
            if(mysqli_num_rows($data) > 0){
                while($row = mysqli_fetch_row($data)){
                    $res .= $row[0]."+".$row[1]."+".$row[2]."*";
                }
            }
            else{
                $res = "fail";
            }
        }
        catch(Exception){
            $res = "error";
        }
        finally{
            $con->turnOff();
        }
        echo $res;
    }
    else if(isset($_POST['getPicturesFull'])){
        $res = "";
        $call = "call home_get_pictures_full();";
        try{
            $data = mysqli_query($con->turnOn(),$call);
            if(mysqli_num_rows($data) > 0){
                while($row = mysqli_fetch_row($data)){
                    $res .= $row[0]."+".$row[1]."+".$row[2]."*";
                }
            }
            else{
                $res = "fail";
            }
        }
        catch(Exception){
            $res = "error";
        }
        finally{
            $con->turnOff();
        }
        echo $res;
    }
    
?>
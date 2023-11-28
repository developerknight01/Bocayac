<?php

use FFI\Exception;

    include "../../access/conection.php";
    $con = new conection();
    date_default_timezone_set('America/Costa_Rica');    
    ini_set('session.gc_maxlifetime', 86400);
    session_start();
    
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > 1800)) {
        session_unset();
        session_destroy();        
    }
    else{
        $_SESSION['last_activity'] = time();
    }    
    
    if(isset($_POST['sectionChange'])){
        $var = json_decode($_POST['sectionChange'],true);        
        $res = "";
        $_SESSION['section'] = $var['sectionActive'];                        
        if($_SESSION['section'] == "" || $_SESSION['section'] == null)
            $_SESSION['section'] = "index";
        $res = $_SESSION['section'];        
        echo $res;
    }
    else if(isset($_POST['checkSection'])){
        if($_SESSION['section'] == null)
            echo $_SESSION['section'] = "index";
        else
            echo $_SESSION['section'];
    }
    else if(isset($_POST['getInformation'])){
        $res = "";
        $proc = json_decode($_POST['getInformation'],true);
        $proc = $proc['info'];
        $call = "call ".$proc."();";
        $data = mysqli_query($con->turnOn(),$call);
        if(mysqli_num_rows($data) > 0){
            while($row = mysqli_fetch_row($data)){
                if($proc == "manage_get")
                    $res .= $row[0]."+".$row[1]."+".$row[2]."*";
                else if($proc == "manage_get_product")
                    $res .= $row[0]."+".$row[1]."+".$row[2]."+".$row[3]."+".$row[4]."+".$row[5]."+".$row[6]."+".$row[7]."+".$row[8]."*";
            }
        }
        else{
            $res = "Conexión fallida";
        }
        $con->turnOff();
        echo $res;
    }
    else if(isset($_POST['updateProfile'])){
        $var = json_decode($_POST['updateProfile'],true);
        $call = "call manage_update('".$var['id']."','".$var['value']."');";
        $res = "fail";
        try{
            $data = mysqli_query($con->turnOn(),$call);
            if($data){
                $res = "done";
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
    else if(isset($_POST['insertSocialMedia'])){
        $var = json_decode($_POST['insertSocialMedia'],true);
        $call = "call manage_insert('".$var['socialM']."','".$var['value']."')";
        $data = "";
        $res = "fail+";
        try{
            $data = mysqli_query($con->turnOn(),$call);
            if($data){
                $con->turnOff();
                $call = "call manage_get_last_byValue('".$var['value']."');";
                $data = mysqli_query($con->turnOn(),$call);
                if(mysqli_num_rows($data) > 0){
                    while($row = mysqli_fetch_row($data)){
                        $res = "done+".$row[0];
                    }
                }
            }
        }
        catch(Exception){
            $res = "error+";
        }
        finally{
            $con->turnOff();
        }
        echo $res;
    }
    else if(isset($_POST['insertNewProduct'])){
        $var = json_decode($_POST['insertNewProduct'],true);
        $res = "fail";
        $call = "call manage_insert_product('".$var['name']."','".$var['description']."','".$var['wood']."','".$var['dimension']."','".$var['price']."','".$var['img']."','".$var['imgThumb']."')";        
        try{
            $data = mysqli_query($con->turnOn(),$call);
            if($data)
                $res = "done";            
        }
        catch(Exception){
            $res = "error";
        }
        finally{
            $con->turnOff();
        }
        echo $res;
    }
    else if(isset($_POST['searchProduct'])){
        $var = json_decode($_POST['searchProduct'],true);
        $res = "fail";
        $call = "call manage_get_product_byID('".$var['idProduct']."')";
        try{
            $data = mysqli_query($con->turnOn(),$call);
            if(mysqli_num_rows($data) > 0){
                while($row = mysqli_fetch_row($data))
                    $res = $row[0]."+".$row[1]."+".$row[2]."+".$row[3]."+".$row[4]."+".$row[5]."+".$row[6]."+".$row[7];            }   
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
    else if(isset($_POST['updateImageProduct'])){
        $var = json_decode($_POST['updateImageProduct'],true);
        $call = "call manage_update_image('".$var['id']."','".$var['image']."','".$var['imageThumb']."')";
        $res = "fail";
        try{
            $data = mysqli_query($con->turnOn(),$call);
            if($data){
                $res = "done";
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
    else if(isset($_POST['updateProduct'])){
        $var = json_decode($_POST['updateProduct'],true);
        $call = "call manage_update_product('".$var['id']."','".$var['kind']."','".$var['description']."','".$var['wood']."','".$var['dimension']."','".$var['price']."');";
        $res = "fail";
        try{
            $data = mysqli_query($con->turnOn(),$call);
            if($data)
                $res = "done";
        }
        catch(Exception){
            $res = "error";
        }
        finally{
            $con->turnOff();
        }
        echo $res;
    }
    else if(isset($_POST['updateStatusProduct'])){
        $var = json_decode($_POST['updateStatusProduct'],true);
        $res = "fail";
        $call = "call manage_update_product_status('".$var['id']."','".$var['op']."');";
        try{
            $data = mysqli_query($con->turnOn(),$call);
            if($data){
                $res = "done";
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
    else if(isset($_POST['checkUser'])){
        $var = json_decode($_POST['checkUser'],true);
        $call = "call manage_check_user('".$var['id']."','".$var['pass']."')";
        $res = "";
        try{
            $data = mysqli_query($con->turnOn(),$call);
            if(mysqli_num_rows($data) > 0){
                $row = mysqli_fetch_row($data);
                if($row[0] == 'done'){
                    $res = "done+".$row[1];
                    $_SESSION['user'] = $row[1];
                }
                else{
                    $res = "fail";
                }
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
    else if(isset($_POST['closeSession'])){
        unset($_SESSION['user']);
    }
    else if(isset($_POST['dataFooter'])){
        $res = "";
        $call = "call manage_get_basicInfo();";
        try{
            $data = mysqli_query($con->turnOn(),$call);
            if(mysqli_num_rows($data) > 0){
                while($row = mysqli_fetch_row($data))
                    $res.= $row[0]."+".$row[1]."*";
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

$(document).ready(function(){
    var value = "";
    if(!location.href.includes("?")){
        location.href = "?user=login"
        value = "../../view/home/login.html";
    }
    else if( location.href.split("?")[1].includes("login")){        
        value = "../../view/home/login.html";
    }
    else if(location.href.includes("restore")){        
        value = "../../view/home/restore.html";
    }    
    $.ajax({
        url:value,
        success:function(html){
            $(".bodyPage").append(html);
            pressEnter();
        }
    });    
});
function pressEnter(){
    $("#id").on("keypress",function(e){
        if(e.which === 13 || e.which === 10){
            if(checkField($("#id")))
                $("#password").focus();
            else{
                buildMessage(transactResult[readCookie("language")]['field_fail']);
            }
        }
    });
    $("#password").on("keypress",function(e){
        if(e.which === 13 || e.which === 10){
            var value = $(this).val();
            value = value.trim();
            if(value.length > 5){
                checkUser();
            }
            else{
                buildMessage(transactResult[readCookie("language")]['field_fail']);
            }
        }
    });
    $("#idRestore").on("keypress",function(e){
        if(e.which === 13 || e.which === 10){
            if(checkField($("#idRestore"))){
                restorePassword();
            }
            else{
                buildMessage(transactResult[readCookie("language")]['field_fail']);
            }
        }
    });
    loadClick();
}
function loadClick(){
    $("#login").click(function(){        
        if(checkField($("#id"))){
            var value = $("#password").val();
            value = value.trim();            
            if(value.length > 5){
                checkUser();
            }
            else{
                buildMessage(transactResult[readCookie("language")]['field_fail']);
            }
        }        
        else{
            buildMessage(transactResult[readCookie("language")]['field_fail']);
        }
    });
}
function restorePassword(){

}
function checkUser(){
    let user = {
        id:$("#id").val(),
        pass:$("#password").val()
    };
    $.ajax({
        url:"../../Controller/Manage/manage.php",
        cache:false,
        method:"post",
        data:{checkUser:JSON.stringify(user)},
        beforeSend:function(){
            showLoadPage();
            buildMessage(transactResult[readCookie("language")]['conection']);            
        },
        success:function(res){
            if(res.includes("done")){
                createCookie("session",res.split("+")[1],1);
                location.href = "../../view/manage/";
            }
            else if(res == "fail"){
                buildMessage(transactResult[readCookie("language")]['user_F'])
            }
            else{
                buildMessage(transactResult[readCookie("language")]['error'])
            }
            hideLoadPage();
        }
    });
}
window.onload = function(){    
    checkPage();
    click();
    checkSession();
    loadDataFromFooter();
    $.ajax({
        url:"../../object/popUp/messagePopUp.html",
        success:function(html){
            $("body").append(html);
            $.ajax({
                url:"../../object/modal/modalImage.html",
                success:function(html){
                    $("body").append(html);
                    $.ajax({
                        url:"../../object/modal/modalContact.html",
                        success:function(html){
                            $("body").append(html);
                            setTimeout(() => {
                                hideLoadPage();
                            }, 1500);
                        }
                    });
                }
            });
        }
    });
}
$(window).on('resize', function(){
    var win = $(this);    
    if (win.width() == 901) {
        console.log(1);
        if($(".navMenu").hasClass("active")){
            $(".navMenu,.barMenu").removeClass("active");
        }    
    }
});
function checkPage(){
    var page = location.href;    
    if(page.includes("index") || page.includes("")){
        $(".content-menu ul li:nth-child(1)").addClass("active");
    }
    else if(page.includes("producto")){
        $(".content-menu ul li:nth-child(2)").addClass("active");        
    }
    else if(page.includes("galeria")){
        $(".content-menu ul li:nth-child(3)").addClass("active");
    }
    else if(page.includes("nosotros")){        
        $(".content-menu ul li:nth-child(4)").addClass("active");
    }
}
function readCookie(name) {
    var cookieName = name + "=";
    var cookies = document.cookie.split(';');  
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}
function createCookie(name, value, yearExpiration) {
    var expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + yearExpiration);  
    var cookie = name + "=" + value + "; expires=" + expirationDate.toUTCString() + "; path=/";
    document.cookie = cookie;
}
function deleteCookie(name){
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
function showLoadPage(){
    $(".pageLoad").removeClass("inactive");
    $("body").addClass("blockScroll"); 
}
function hideLoadPage(){
    $(".pageLoad").addClass("inactive");
    $("body").removeClass("blockScroll");
}
function click(){
    $(".navMenu .barMenu").click(function(){        
        if(!$(".navMenu").hasClass("active")){
            $(".navMenu,.barMenu").addClass("active");
            $("body").addClass("blockScroll");
        }
        else{
            $(".navMenu,.barMenu").removeClass("active");
            $("body").removeClass("blockScroll");
        }
    });
    $(".btnUX").click(function(){
        if(!$(".btnUX").hasClass("active")){
            $(".boxUX").addClass("active");
            $("body").addClass("blockScroll");
        }
        else{
            $(".boxUX").removeClass("active");
            $("body").removeClass("blockScroll");
        }
    });
    $(".boxUX .bar").click(function(){
        $(".boxUX").removeClass("active");
        $("body").removeClass("blockScroll");
    });
}
function checkSession(){
    var status = readCookie("session");    
    if(status != null && status != "" && status != "null"){        
        if(location.href.includes("manage")){
            $(".navMenu .content-menu ul").after(
                "<ul>" +
                    "<li id='closeSession' class='nav-item' data-translation='btnCloseSession'>" +
                        "<span class='btnCloseSession'>Cerrar Sesión</span>" +
                    "</li>" +
                "</ul>"
            );
            $("#closeSession").click(function(){
                var temp = "";
                $.ajax({
                    url:"../../Controller/manage.php",
                    method:"post",
                    cache:false,
                    data:{closeSession:JSON.stringify(temp)},
                    beforeSend:function(){
                        showLoadPage();
                    },
                    success:function(){
                        deleteCookie("session");
                        location.href = "../../view/home/";
                    }                    
                });                
            });
        }     
        else{
            setTimeout(() => {
                $(".navMenu .content-menu ul").after(
                    "<ul>" +
                        "<li class='nav-item btnSession' data-translation='btnSession'>" +
                            "<span class='btnSession'>Perfil</span>" +
                        "</li>" +
                    "</ul>"
                );
                $(".navMenu .content-menu ul .btnSession").click(function(){                    
                    window.location.href = "../manage/";
                });
            }, 200);
        }   
    }
    else if(window.location.href.includes("manage")){        
        location.href = "../../view/home/"
    }
}
function loadDataFromFooter(){
    var temp = {};
    $.ajax({
        url:"../../Controller/Manage/manage.php",
        cache:false,
        method:"post",
        beforeSend:function(){
            showLoadPage();
        },
        data:{dataFooter:JSON.stringify(temp)},
        success:function(res){            
            $("footer #ownEmail").append(
                "<b data-translation='footEmail'>Correo electrónico</b>"+
                "<a href='mailto:"+res.split("*")[2].split("+")[1]+"'>"+res.split("*")[2].split("+")[1]+"</a>"+                
                "<a href='mailto:"+res.split("*")[3].split("+")[1]+"'>"+res.split("*")[3].split("+")[1]+"</a>"
            );
            $("footer #ownPhone").append(
                "<b data-translation='footPhone'>Teléfono</b>"+
                "<a href='tel:+506"+res.split("*")[0].split("+")[1]+"'>+506"+res.split("*")[0].split("+")[1]+"</a>"+                
                "<a href='tel:+506"+res.split("*")[1].split("+")[1]+"'>+506"+res.split("*")[1].split("+")[1]+"</a>"
            );
            $("footer #socialMedia").append("<b data-translation='socialMedia'>Redes Sociales</b>")
            for(var i = 4; i < res.split("*").length-1;i++){
                $("footer #socialMedia").append(
                    "<li><a href='"+res.split("*")[i].split("+")[1]+"'>"+res.split("*")[i].split("+")[0]+"</a></li>"
                );
            }
            hideLoadPage();
        }
    });
}
function checkField(obj){
    const regex = [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,/^\d+$/,/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/]
    var kind = $(obj).attr("data-type");
    var value = $(obj).val();
    var result = false;
    if(kind == "email"){
        result = regex[0].test(value);
    }
    else if(kind == "phone" && value.length >=8 || kind == "price"&& value > 0){
        result = regex[1].test(value);
    }
    else if(kind == "web" || kind == "social"){
        result = regex[2].test(value);
    }
    else if(kind == "product" || kind == "wood" || kind == "dimension"){
        if(value.length > 0){
            result = true;
        }
    }
    else if(kind == "img"){
        if(value.length > 0)
            result = true;
    }    
    if(!result){        
        if(kind == "img"){
            $("#img").addClass("error errorForm");
        }
        else        
            $(obj).addClass("error errorForm");
        setTimeout(() => {
            $("#img").add("error errorForm");
            $(obj).removeClass("error errorForm");
        }, 6500);
    }
    return result;
}
function searchInformation(){
    $("#search").on("keypress",function(e){
        var flagNotFound = true;
        if(e.which === 13 || e.which === 10){  
            var value = $(this).val();
            $(".contentInfo.product .box").each(function(){
                if(!$(this).attr("data-product").includes(value) && !$(this).children(".boxHead").children("h5").text().includes(value)){
                    $(this).css("display","none");                    
                }
                else{
                    $(this).css("display","block");
                    flagNotFound = false;
                }
            });
            if(flagNotFound){
                $(".contentInfo.product .box").css("display","block");
                buildMessage(transactResult[readCookie("language")]['fail_S'],6500);
            }
        }
    });
}
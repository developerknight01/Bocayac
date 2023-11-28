$(document).ready(function(){   
    $.ajax({
        url:"../../object/modal/modalSearch.html",
        success:function(html){
            $("body").append(html);       
            $("body").append(
                "<link rel='stylesheet' href='../../object/modal/modalForm.css'>"+
                "<script src='../../object/modal/modalForm.js'></script>"
            );     
        }
    });
    loadInformation();
});
function searchKindProduct(value){
    var flagNotFound = true;            
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
function loadClick(){
    $("#searchProduct").click(function(){
        openModalForm($(".modalSearch"));
    });
}
function loadInformation(){
    var dataToSend = {info: "manage_get_product"};        
    $.ajax({
        url:"../../Controller/Manage/manage.php",
        method:"post",
        cache:false,
        data:{getInformation:JSON.stringify(dataToSend)},
        success:function(res){
            buildProduct(res);            
        }
    });
}
function buildProduct(data){
    data = data.split("*");        
    $.ajax({
        url:"../../view/manage/rowProduct.html",
        success:function(html){
            var furniture = [];            
            for(var i = 0; i < data.length-1;i++){                
                $(".contentInfo.product").append(html);
                $(".box:last-child").attr("data-product",data[i].split("+")[1].split(" ")[0].toLowerCase());
                $(".box:last-child .boxHead h5").text(data[i].split("+")[2] + " - " + data[i].split("+")[1]);
                $(".box:last-child .boxBody tbody tr td:first-child img").attr("src",data[i].split("+")[7]);
                $(".box:last-child .boxBody tbody tr td:first-child img").attr("alt",data[i].split("+")[6]);
                $(".box:last-child .boxBody tbody tr td:nth-child(2)").text(data[i].split("+")[3]);
                $(".box:last-child .boxBody tbody tr td:nth-child(3)").text(data[i].split("+")[4]);
                $(".box:last-child .boxBody tbody tr td:nth-child(4)").text(data[i].split("+")[5]);
                $(".box:last-child .boxBody thead tr th:last-child,.box:last-child .boxBody tbody tr td:last-child").remove();
                $(".bodyPage .contentInfo.product img").click(function(){
                    openImage($(this));
                });
                if(!checkAutocomplete(furniture,data[i].split("+")[1].split(" ")[0].toLowerCase()))
                    furniture[i] = data[i].split("+")[1].split(" ")[0].toLowerCase();
            }
            $(".modalSearch #search").autocomplete({
                source: furniture
            });
            checkParamsURL(furniture);
            
        }
    });
    searchInformation();
    loadClick();
}
function checkParamsURL(furniture){
    let searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has("id")){
        let param = searchParams.get("id")
        for(var i = 0; i < furniture.length;i++){                    
            if(param.includes(furniture[i])){
                param = furniture[i];
            }                    
        }
        searchKindProduct(param);
        $("#search").val(param);
    }
}
function checkAutocomplete(array,val){
    var res = false;    
    for(var i = 0; i < array.length;i++){
        if(array[i] == val){
            res = true;
            break;
        }
    }
    return res;
}
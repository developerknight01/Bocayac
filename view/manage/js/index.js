$(document).ready(function(){
    setTimeout(() => {
        checkSecondMenu();
    }, 200);
    clickManage();
    checkSectionSelected();
    $.ajax({
        url:"../../object/modal/modalForm.html",
        success:function(html){
            $("body").append(html);            
        }
    });
    $.ajax({
        url:"../../object/modal/modalSearch.html",
        success:function(html){
            $("body").append(html);            
        }
    });
    $.ajax({
        url:"../../object/modal/modalConfirm.html",
        success:function(html){
            $("body").append(html);            
        }
    });
});
function checkSecondMenu(){    
    var text = $(".secondMenu ul li.active label").text();
    $(".headPage h4").append(
        "<span class='section'>"+text+"</span>"                    
    );

}
function clickManage(){
    $(".boxField input").focus(function(){
        $(this).parent().addClass("focus");
    });
    $(".boxField input").blur(function(){
        $(this).parent().removeClass("focus");
    });
    $(".bodyPage .secondMenu ul li").click(function(){
        if(!$(this).hasClass("active")){
            $(".bodyPage .secondMenu ul li.active").removeClass("active");
            $(".bodyPage .content-body article").addClass("fade");
            setTimeout(() => {
                $(".bodyPage .content-body article").addClass("move");
                setTimeout(() => {
                    $(this).addClass("active");
                    var option = [];
                    option[0] = $(this).children("label").text();
                    option[1] = 0;
                    console.log(option[0]);
                    $(".headPage h4 .section").text(option[0]);
                    changeSection(option);
                }, 450);
            }, 350);
        }
    });
}
function changeSection(option){
    var dataToSend = null
            
    if(option[0] == "Perfile" || option[0] == "Profile"){
        option[0] = "index";
        option[1] = 1;
    }        
    else if(option[0] == "Productos" || option[0] == "Product"){
        option[0] = "product";
        option[1] = 2;
    }        
    else{
        option[0] = "index";
        option[1] = 1;
    }        

    dataToSend = {
        sectionActive:option[0]
    };
    $.ajax({
        url:"../../Controller/Manage/manage.php",
        method:"post",
        cache:false,
        data:{sectionChange:JSON.stringify(dataToSend)},
        success:function(res){            
            if(res == "index")
                res = "manageContact";
            else if(res == "product")
                res = "manageProduct";
            $(".bodyPage .secondMenu ul li:nth-child("+option[1]+")").addClass("active");
            loadContent(res);
        }
    });
}
function checkSectionSelected(){
    var dataToSend = {user:'test'};
    $.ajax({
        url:"../../Controller/Manage/manage.php",
        method:"post",
        cache:false,
        data:{checkSection:JSON.stringify(dataToSend)},
        success:function(res){
            var option = 0;                 
            if(res == "index"){
                res = "manageContact";
                option = 1;
            }                
            else if(res == "product"){
                res = "manageProduct";
                option = 2;
            }             
            $(".bodyPage .secondMenu ul li:nth-child("+option+")").addClass("active");
            loadContent(res);
        }
    });
}
function loadContent(html){
    $.ajax({
        url:html,
        success:function(data){
            $(".bodyPage .content-body article").remove();
            $(".bodyPage .content-body").append(data);
            loadInformation(html);
            loadClick();
        }
    });
}
function loadClick(){
    $(".bodyPage .contentInfo.contact .copy").click(function(){        
        var $temp = $("<input id='inputTempToCopy'>");
        $("body").append($temp);        
        $temp.val($(this).parent().children("input").attr("placeholder")).select();
        document.execCommand("copy");
        $temp.remove();               
    });
    $(".bodyPage .contentInfo.product #addProduct").click(function(){
        openModalForm($(".modalForm"));
    });    
    $(".bodyPage .contentInfo.product #searchProduct").click(function(){
        openModalForm($(".modalSearch"));
    });
    $(".modalConfirm .modalConfirm-body #disable").click(function(){                   
        disableOrDelete($(this));
    });
    $(".modalConfirm .modalConfirm-body #delete").click(function(){
        disableOrDelete($(this));
    });
}
function loadInformation(html){
    var dataToSend = null;
    if(html == "manageContact")
        html = "manage_get";
    else if(html == "manageProduct")
        html = "manage_get_product";
    dataToSend = {info: html};
    $.ajax({
        url:"../../Controller/Manage/manage.php",
        method:"post",
        cache:false,
        data:{getInformation:JSON.stringify(dataToSend)},
        success:function(res){
            if(html == "manage_get"){
                buildManage(res);
            }
            else if(html == "manage_get_product"){
                buildProduct(res);
            }
        }
    });
}
function buildManage(data){
    data = data.split("*");
    setTimeout(() => {
        for(var i = 0; i < data.length-1; i++){        
            if(data[i].split("+")[1] == "Email"){
                $(".bodyPage .contact .box .boxField .email").each(function(){                  
                    if($(this).attr("placeholder") == "Email" || $(this).attr("placeholder") == "Correo electrónico"){                      
                        $(this).attr("id",data[i].split("+")[0]);
                        $(this).attr("placeholder",data[i].split("+")[2]);                    
                        return false;
                    }
                });
            }
            else if(data[i].split("+")[1] == "Phone"){
                $(".bodyPage .contact .phone").each(function(){
                    if($(this).attr("placeholder") == "####-####"){
                        $(this).attr("id",data[i].split("+")[0]);
                        $(this).attr("placeholder",data[i].split("+")[2]);
                        return false;
                    }
                });
            }
            else if(data[i].split("+")[2].includes("facebook") ||
            data[i].split("+")[2].includes("instagram") || 
            data[i].split("+")[2].includes("youtube") ||
            data[i].split("+")[2].includes("tiktok")){              
                $(".bodyPage .socialM .social").each(function(){                
                    if($(this).attr("placeholder") == ""){                    
                        $(this).attr("id",data[i].split("+")[0]);
                        $(this).attr("placeholder",data[i].split("+")[2]);
                        var social = data[i].split("+")[2].split(".")[1].split(".")[0];
                        social = social.charAt(0).toUpperCase() + social.slice(1,social.length);
                        $(this).parent().parent().parent().children(".boxHead").children("h5").text(social+":");
                        return false;
                    }
                });                      
            }    
        }
        $(".bodyPage .socialM .social").each(function(){
            if($(this).attr("placeholder") == ""){
                $(this).attr("placeholder","Click para agregar una red social");
                $(this).attr("data-translation-placeholder","socialMedia");
                $(this).parent().parent().parent().children(".boxHead").children("h5").attr("data-translation-section","TitleSocialM")
            }
        });
        updateProfile();
        insertSocialMedia();
    }, 100);
}
function buildProduct(data){
    data = data.split("*");        
    $.ajax({
        url:"rowProduct.html",
        success:function(html){
            for(var i = 0; i < data.length-1;i++){                
                $(".contentInfo.product").append(html);
                $(".box:last-child").attr("data-product",data[i].split("+")[1].split(" ")[0].toLowerCase());
                $(".box:last-child .boxHead h5").text(data[i].split("+")[2] + " - " + data[i].split("+")[1]);
                $(".box:last-child .boxBody tbody tr td:first-child img").attr("src",data[i].split("+")[7]);
                $(".box:last-child .boxBody tbody tr td:first-child img").attr("alt",data[i].split("+")[6]);
                $(".box:last-child .boxBody tbody tr td:nth-child(2)").text(data[i].split("+")[3]);
                $(".box:last-child .boxBody tbody tr td:nth-child(3)").text(data[i].split("+")[4]);
                $(".box:last-child .boxBody tbody tr td:nth-child(4)").text(data[i].split("+")[5]);
                $(".box:last-child .boxBody tbody tr td:nth-child(5) .btnOpenModal").addClass("product-"+data[i].split("+")[0]);
                $(".box:last-child .boxBody tbody tr td:nth-child(5) .btnDisableProduct").addClass("product-"+data[i].split("+")[0]);
                $(".bodyPage .contentInfo.product img").click(function(){
                    openImage($(this));
                });
                $(".bodyPage .contentInfo.product .btnOpenModal.product-"+data[i].split("+")[0]).click(function(){
                    openModalToUpdate($(this));
                });
                $(".bodyPage .contentInfo.product .btnDisableProduct.product-"+data[i].split("+")[0]).click(function(){                    
                    if($(this).attr("class").includes("enable")){                        
                        $(".modalConfirm .modalConfirm-body #disable").attr("data-translation-section","btnView_enable");
                    }
                    else{
                        $(".modalConfirm .modalConfirm-body #disable").attr("data-translation-section","btnView_disable");
                    }
                    checkLanguage();
                    openModalForm($(".modalConfirm"));
                    var text = $(this).parent().parent().parent().parent().parent().parent().parent().children(".boxHead").children("h5").text();                    
                    $(".modalConfirm .modalConfirm-body h4").text(text);
                    $(".modalConfirm .modalConfirm-body #disable").attr("data-id",$(this).attr("class").split("-")[1].split(" ")[0]);
                    $(".modalConfirm .modalConfirm-body #delete").attr("data-id",$(this).attr("class").split("-")[1].split(" ")[0]);
                });
                if(data[i].split("+")[8] == "1"){
                    $(".bodyPage .contentInfo.product .btnDisableProduct.product-"+data[i].split("+")[0]).addClass("enable");
                }
                else{
                    $(".bodyPage .contentInfo.product .btnDisableProduct.product-"+data[i].split("+")[0]).addClass("disable");
                }

            }            
        }
    });
    searchInformation();
}
function disableOrDelete(obj){    
    var dataToSend = {
        id:$(obj).attr("data-id"),
        op:1
    };
    if($(obj).attr("id") == "delete"){
        dataToSend.op = 2;
    }
    else{
        if($(obj).attr("data-translation-section") == "btnView_enable"){
            dataToSend.op = 0;
        }
    }         
    $.ajax({
        url:"../../Controller/Manage/manage.php",
        method:"post",
        cache:false,
        beforeSend:function(){
            showLoadPage();            
            buildMessage(transactResult[readCookie("language")]['conection'],5000);
        },
        data:{updateStatusProduct:JSON.stringify(dataToSend)},
        success:function(res){
            closeMessage();
            setTimeout(() => {
                if(res == "done"){
                    buildMessage(transactResult[readCookie("language")]["done_U"],6500);
                    refreshDataProduct();
                }
                else if(res == "fail"){
                    buildMessage(transactResult[readCookie("language")]["fail_U"],6500);
                }
                else{
                    buildMessage(transactResult[readCookie("language")]["error"],6500);
                }
                hideLoadPage();
                closeModalForm();
            }, 500);            
        }
    });
}
function openModalToUpdate(obj){
    var dataToSend = {
        idProduct:$(obj).attr("class").split("-")[1]
    };    
    $.ajax({
        url:"../../Controller/Manage/manage.php",
        method:"post",
        cache:false,
        data:{searchProduct:JSON.stringify(dataToSend)},
        beforeSend:function(){
            buildMessage(transactResult[readCookie("language")]['conection'],5000);
        },
        success:function(res){            
            if(res == "fail"){
                buildMessage(transactResult[readCookie("language")]['fail_U'],5000);
            }
            else if(res == "error"){
                buildMessage(transactResult[readCookie("language")]['fail_U'],5000);
            }
            else{
                closeMessage();
                openModalFormToUpdate($(".modalForm"));
                buildInformation(res);
            }
        }
    });
}
function buildInformation(data){
    let prod = {
        id: data.split("+")[0],
        kind: data.split("+")[1],
        description: data.split("+")[2],
        wood: data.split("+")[3],
        dimension: data.split("+")[4],
        price: data.split("+")[5]
    };    
    $(".modalForm .modalForm-body #imgName").val(data.split("+")[1]);
    $(".modalForm .modalForm-body #description").val(data.split("+")[2]);
    $(".modalForm .modalForm-body #dimension").val(data.split("+")[4]);    
    $(".modalForm .modalForm-body #price").val(data.split("+")[5]);
    $(".modalForm .modalForm-body #wood").val(data.split("+")[3]);    
    $(".modalForm .modalForm-body #boxImg label").after(
        "<img src='"+data.split("+")[7]+"' class='img-thumbnail'/>"+
        "<input type='text' id='newImg' class='form__input' data-translation-placeholder='imgProduct' placeholder='Seleccionar nueva imagen'>"+
        "<input type='file' id='newImgSearch' name='img' data-type='img'>"+
        "<button id='changeImg' data-translation-section='newImg'>Actualizar Imagen</button>"
    );
    $(".modalForm .modalForm-body #img").addClass("hide");
    $("#newImg").click(function(){
        $("#newImgSearch").click();
    });
    $(".modalForm .modalForm-footer #update").click(function(){
        updateProduct(prod);
    })
    updateImage(prod.id);
}
function updateProduct(info){
    info.kind = $(".modalForm #imgName").val();
    info.description = $(".modalForm #description").val();
    info.dimension = $(".modalForm #dimension").val();
    info.price = $(".modalForm #price").val();
    info.wood = $(".modalForm #wood").val();
    if(checkField($(".modalForm #imgName")) || checkField($(".modalForm #description")) ||
    checkField($(".modalForm #dimension")) || checkField($(".modalForm #price")) ||
    checkField($(".modalForm #wood"))){
        $.ajax({
            url:"../../Controller/Manage/manage.php",
            method:"post",
            cache:false,
            beforeSend:function(){
                showLoadPage();
                buildMessage(transactResult[readCookie("language")]['conection'],5000);
            },
            data:{updateProduct:JSON.stringify(info)},
            success:function(res){
                if(res == "done"){
                    clearFields();
                    $(".modalForm .modalForm-body #boxImg #newImg,.modalForm .modalForm-body #boxImg #newImgSearch,.modalForm .modalForm-body #boxImg #changeImg").remove();
                    $(".modalForm .modalForm-body #img").removeClass("hide");
                    $(".modalForm .modalForm-head h4").text("Registrar Producto");
                    $(".modalForm .modalForm-head h4").attr("data-translation-section","headModal");
                    $(".modalForm .modalForm-footer #update").attr("data-translation-section","btnSend");
                    $(".modalForm .modalForm-footer #update").attr("id","send");
                    buildMessage(transactResult[readCookie("language")]['done_U'],5000);
                    refreshDataProduct();
                }
                else{
                    buildMessage(transactResult[readCookie("language")]['fail_U'],5000);
                }
                hideLoadPage();
                closeModalForm();
            }
        }); 
    }
    else{
        buildMessage(transactResult[readCookie("language")]['field_fail'],5000);
    }
}
function refreshDataProduct(){
    $(".contentInfo.product .box").remove();
    $(".bodyPage .content-body article").addClass("fade");
    setTimeout(() => {
        $(".bodyPage .content-body article").addClass("move");
        checkLanguage();
        setTimeout(() => {
            $(".bodyPage .content-body article").removeClass("move");
            setTimeout(() => {
                $(".bodyPage .content-body article").removeClass("fade");
                loadInformation("manageProduct");
            }, 250);
        }, 450);
    }, 350);
}
function updateProfile(){    
    $("#1,#2,#3,#4,#5,#6,#7").on("keypress",function(e){
        if(e.which === 13 || e.which === 10){            
            let obj = {
                id:$(this).attr("id"),
                value:$(this).val()
            };            
            if(checkField($(this))){
                $.ajax({
                    url:"../../Controller/Manage/manage.php",
                    method:"post",
                    cache:false,
                    data:{updateProfile:JSON.stringify(obj)},
                    beforeSend:function(){
                        showLoadPage();
                        buildMessage(transactResult[readCookie("language")]['conection'],5000);                        
                    },
                    success:function(res){
                        closeMessage();                        
                        if(res == "done"){
                            buildMessage(transactResult[readCookie("language")]['done_U'],5000);
                            $("#"+obj.id).attr("placeholder",$("#"+obj.id).val());
                            $("#"+obj.id).val(null);
                        }
                        else if(res == "fail"){
                            buildMessage(transactResult[readCookie("language")]['fail_U'],5000);
                        }
                        hideLoadPage();
                    }
                });
            }
            else{
                buildMessage(transactResult[readCookie('language')]['field_fail'],8500);
                $(this).parent().addClass("error");
                setTimeout(() => {
                    $(this).parent().removeClass("error");
                }, 6500);
            }
            
        }
    });
}
function insertSocialMedia(){
    $(".bodyPage .socialM .social").on("keypress",function(e){
        if(e.which === 13 || e.which === 10){
            if($(this).attr("id") == null){
                var social = $(this).val().split(".")[1].split(".")[0];
                social = social.charAt(0).toUpperCase() + social.slice(1,social.length);
                var dataToSend = {
                    id:$(this).attr("class"),
                    value:$(this).val(),
                    socialM:social
                };
                if(checkField($(this))){
                    $.ajax({
                        url:"../../Controller/Manage/manage.php",
                        method:"post",
                        cache:false,
                        data:{insertSocialMedia:JSON.stringify(dataToSend)},
                        beforeSend:function(){
                            showLoadPage();
                            buildMessage(transactResult[readCookie('language')]['conection'],5000);
                        },
                        success:function(res){                            
                            if(res.split("+")[0] == "done"){
                                $(".bodyPage .socialM .boxField ."+dataToSend.id.split(" ")[1]).parent().parent().parent().children(".boxHead").children("h5").attr("data-translation-section","");
                                $(".bodyPage .socialM .boxField ."+dataToSend.id.split(" ")[1]).parent().parent().parent().children(".boxHead").children("h5").text(social+":");
                                $(".bodyPage .socialM .boxField ."+dataToSend.id.split(" ")[1]).attr("data-translation-placeholder","");                                
                                $(".bodyPage .socialM .boxField ."+dataToSend.id.split(" ")[1]).attr("placeholder",$(".bodyPage .socialM .boxField ."+dataToSend.id.split(" ")[1]).val());
                                $(".bodyPage .socialM .boxField ."+dataToSend.id.split(" ")[1]).attr("id",res.split("+")[1]);
                                buildMessage(transactResult[readCookie('language')]['done_R'],5000);
                            }
                            else if(res.split("+")[0] == "fail"){
                                buildMessage(transactResult[readCookie('language')]['fail_U'],5000);
                            }
                            else{
                                buildMessage(transactResult[readCookie('language')]['error'],5000);
                            }
                            hideLoadPage();
                        }
                    });
                }
                else{
                    buildMessage(transactResult[readCookie('language')]['field_fail'],8500);
                }
            }
        }
    });
}
function updateImage(idProduct){
    var savedData = [];
    const inpFile = document.querySelector("#newImgSearch");
    inpFile.addEventListener("change",function(){        
        const file = this.files[0];
        const fileType= this.files[0].type;
        const image = new Image(200,200);

        if(file){
            if(fileType == "image/jpeg" || fileType == "image/png"){
                const reader = new FileReader();
                reader.onload = ()=>{
                    const res = reader.result;
                    image.src = res;
                    image.className = "img-thumbnail";
                    $("#boxImg .img-thumbnail").remove();
                    $("#boxImg label").after(image);
                    $("#newImg").val($("#newImgSearch").val());
                }
                reader.readAsDataURL(file);
            }
        }
    });
    const addProduct = document.querySelector("#changeImg");
    const form = document.querySelector("#uploadProduct");
    addProduct.onclick = e =>{        
        showLoadPage();
        e.preventDefault();
        addProduct.disabled = true;
        const data = new FormData(form);
        let date = new Date();
        let time = new String(date.getTime());
        let name = time + Math.floor(Math.random() * 10);
        if(data.get('imgName') == ""){
            data.set("imgName","img_"+name);
        }
        if(checkField($("#imgName")) || checkField($("#dimension")) ||
        checkField($("#price")) || checkField($("#wood")))
            sendNewPicture(data);
        else{
            buildMessage(transactResult[readCookie("language")]['empty']);
            hideLoadPage();
        }            
    };
    const saveNewImg = data => {
        savedData.push(data);
        localStorage.setItem('saveImg', JSON.stringify(savedData));
        buildMessage(transactResult[readCookie("language")]["upload_S"]);
        addProduct.disabled = false;
        updateImageProduct(idProduct,data.urlImage,data.urlThumb);        
    }
    const sendNewPicture = async(data) =>{
        return await fetch('../../Controller/Manage/uploadImage.php', {
            method: 'POST',
            body: data
        }).then(res => {
            if(res.ok){
                return res.json();
            }else{
                buildMessage(transactResult[readCookie("language")]["fail_U"]);
            }
        }).then(res => {
            if(res.error){
                console.log(res.error);
                buildMessage(transactResult[readCookie("language")]["image_Empty"]);
                hideLoadPage();
            }else{
                const objImg = {
                    urlImage: res.image_url,
                    urlThumb: res.thumb_url
                };                
                saveNewImg(objImg);
            }
        });
    }  
}
setTimeout(() => {
    var savedData = [];
    const inpFile = document.querySelector("#imgSearch");
    inpFile.addEventListener("change",function(){        
        const file = this.files[0];
        const fileType= this.files[0].type;
        const image = new Image(200,200);

        if(file){
            if(fileType == "image/jpeg" || fileType == "image/png"){
                const reader = new FileReader();
                reader.onload = ()=>{
                    const res = reader.result;
                    image.src = res;
                    image.className = "img-thumbnail";
                    $("#boxImg label").after(image);
                    $("#img").val($("#imgSearch").val());
                }
                reader.readAsDataURL(file);
            }
        }
    });

    const addProduct = document.querySelector("#send");
    const form = document.querySelector("#uploadProduct");
    addProduct.onclick = e =>{
        showLoadPage();
        e.preventDefault();        
        const data = new FormData(form);
        let date = new Date();
        let time = new String(date.getTime());
        let name = time + Math.floor(Math.random() * 10);
        if(data.get('imgName') == ""){
            data.set("imgName","img_"+name);
        }
        if(checkField($("#imgName")) || checkField($("#dimension")) ||
        checkField($("#price")) || checkField($("#wood")))
            sendProduct(data);
        else{
            buildMessage(transactResult[readCookie("language")]['empty']);
            hideLoadPage();
        }            
    };
    let clearForm = () => {
        form.reset();        
    }
    const saveData = data => {
        savedData.push(data);
        localStorage.setItem('saveImg', JSON.stringify(savedData));
        buildMessage(transactResult[readCookie("language")]["upload_S"]);
        addProduct.disabled = false;
        insertProduct(data.urlImage,data.urlThumb);        
    }
    const sendProduct = async(data) =>{
        return await fetch('../../Controller/Manage/uploadImage.php', {
            method: 'POST',
            body: data
        }).then(res => {
            if(res.ok){
                return res.json();
            }else{
                buildMessage(transactResult[readCookie("language")]["fail_U"]);
            }
        }).then(res => {
            if(res.error){
                console.log(res.error);
                buildMessage(transactResult[readCookie("language")]["image_Empty"]);
                hideLoadPage();
            }else{
                const objImg = {
                    urlImage: res.image_url,
                    urlThumb: res.thumb_url
                };                
                saveData(objImg);
            }
        });
    }       
}, 200);
function updateImageProduct(idProduct,img,thumb){
    let obj ={
        id:idProduct,
        image:img,
        imageThumb:thumb
    };
    $.ajax({
        url:"../../Controller/Manage/manage.php",
        method:"post",
        cache:false,
        beforeSend:function(){
            showLoadPage();
            buildMessage(transactResult[readCookie("language")]['conection'],5000);
        },
        data:{updateImageProduct:JSON.stringify(obj)},
        success:function(res){
            if(res == "done"){
                buildMessage(transactResult[readCookie("language")]['done_U'],8500);
            }
            else{
                buildMessage(transactResult[readCookie("language")]['error'],5000);
            }
            hideLoadPage();
        }
    });
}
function insertProduct(image,thumb){    
    let obj = {
        name:$("#imgName").val(),
        description:$("#description").val(),
        dimension:$("#dimension").val(),
        price:$("#price").val(),
        wood:$("#wood").val(),
        img:image,
        imgThumb:thumb
    };
    $.ajax({
        url:"../../Controller/Manage/manage.php",
        method:"post",
        cache:false,
        data:{insertNewProduct:JSON.stringify(obj)},
        beforeSend:function(){
            showLoadPage();
        },
        success:function(res){
            if(res == "done"){
                buildMessage(transactResult[readCookie("language")]['done_R']);
                clearFields();
                $(".contentInfo.product .box").remove();
                $(".bodyPage .content-body article").addClass("fade");
                setTimeout(() => {
                    $(".bodyPage .content-body article").addClass("move");
                    setTimeout(() => {
                        $(".bodyPage .content-body article").removeClass("move");
                        setTimeout(() => {
                            $(".bodyPage .content-body article").removeClass("fade");
                            loadInformation("manageProduct");
                        }, 350);
                    }, 450);
                }, 350);                
            }
            else if(res == "fail"){
                buildMessage(transactResult[readCookie("language")]['fail_U']);
            }
            else{
                buildMessage(transactResult[readCookie("language")]['error']);
            }
            hideLoadPage();            
        }
    });
}
function clearFields(){
    $(".modalForm .modalForm-body .form__input,#imgSearch").val(null);
    $("#boxImg .img-thumbnail").remove();
}
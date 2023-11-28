$(document).ready(function(){
    $(".modalAlt .btnCloseModal").click(function(){
        closeModalForm(false);
    });
    $(".modalAlt #cancel").click(function(){
        closeModalForm(true);
    });    
    $("#img").click(function(){
        $("#imgSearch").click();
    });    
    $("#restar").click(function(){
        $(".contentInfo.product .box").each(function(){
            if($(this).css("display") == "none")
                $(this).css("display","block");
        });
        $(".modalSearch #search").val(null);
    });
});
function openModalForm(obj){
    $(obj).addClass("active");
    if($(obj).hasClass("modalForm")){
        $(obj).children(".modalForm-body #boxImg .img-thumbnail").remove();
        $(".modalForm #send").removeClass("hide");
        $(".modalForm #update").addClass("hide");
    }
    $("body").addClass("blockScroll");
}
function openModalFormToUpdate(obj){    
    $(obj).addClass("active");    
    $(".modalForm #send").addClass("hide");
    $(".modalForm #update").removeClass("hide");
    $("."+$(obj).attr("class").split(" ")[0] + " .modalForm-head").children("h4").text("Actualizar Producto");
    $("."+$(obj).attr("class").split(" ")[0] + " .modalForm-head").children("h4").attr("data-translation-section","headModalUpdate");
    $("body").addClass("blockScroll");
    checkLanguage();
}
function cancelModalForm(){
    closeModalForm();
}
function closeModalForm(){
    $(".modalAlt.active").addClass("hide");
    setTimeout(() => {
        if($(".modalAlt.active").hasClass("modalForm")){
            $(".modalForm .modalForm-body #boxImg #newImg,.modalForm .modalForm-body #boxImg #newImgSearch,.modalForm .modalForm-body #boxImg #changeImg").remove();
            $(".modalForm .modalForm-body #img").removeClass("hide");
            $(".modalForm .modalForm-head h5").text("Registrar Producto");
            $(".modalForm .modalForm-head h5").attr("data-translation-section","headModal");
            $(".modalForm #update").addClass("hide");
            $(".modalForm #send").removeClass("hide");
            $(".img-thumbnail").remove();
        }
        $(".modalAlt.active input").val(null);
        $(".modalAlt.active").removeClass("active hide");
        $("body").removeClass("blockScroll");        
    }, 850);
}
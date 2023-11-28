const transactResult = {
    es:{
        done_U:"Actualización exitosa",
        done_R:"Registro exitoso",
        fail_U:"Proceso fallido",
        conection:"Verificando conexión",
        field_fail:"Un campo es incorrecto",
        error:"Problemas con el servidor",
        empty:"Algún campo está vacío",
        upload_S:"La imagen se ha guardado",
        image_Empty:"No se encontró una imagen correcta",
        support:"Solicite apoyo de soporte",
        fail_S:"Sin resultados",
        loadPicture:"Cargando fotografía, puede que demore un poco",
        user_F:"Usuario o contraseña incorrecto"
    },
    en:{
        done_U:"Success update",
        done_R:"Success register",
        fail_U:"Fail process",
        conection:"Check conection",
        field_fail:"A field is wrong",
        error:"Problemas con el servidor",
        empty:"Some field is empty",
        upload_S:"Success upload picture",
        image_Empty:"Not image",
        support:"Solicite apoyo de soporte",
        fail_S:"Without result",
        loadPicture:"Load picture, it could be to take a moment",
        user_F:"User or password failed"
    }
};
$(document).ready(function(){
    closeMessage();     
});
function buildMessage(message,time){    
    if(message.includes("\n")){
        for(var i = 0; i < message.split("\n").length;i++){
            if(i == 0)
                $(".contentPopUp .boxPopUp .leftPopUp").append("<h5>"+message.split("\n")[i]+"</h5>");
            else
                $(".contentPopUp .boxPopUp .leftPopUp h5:last-child").after("<h5>"+message.split("\n")[i]+"</h5>");
        }
        
    }
    else{
        $(".contentPopUp .boxPopUp .leftPopUp").append("<h5>"+message+"</h5>");
    }
    $(".contentPopUp").addClass("active");
    if(time == null || time == "")
        time = 5000;
    setTimeout(() => {
        $(".contentPopUp").removeClass("active");
        setTimeout(() => {
            $(".contentPopUp .boxPopUp .leftPopUp h5").remove();
        }, 250);
    }, time);
}
function closeMessage(){
    $(".contentPopUp .btnClosePopUp").click(function(){
        $(".contentPopUp").removeClass("active");
        setTimeout(() => {
            $(".contentPopUp .boxPopUp .leftPopUp h5").remove();
        }, 250);
    });
}
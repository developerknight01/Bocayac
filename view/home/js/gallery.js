$(document).ready(function(){
    getPictures();
});
function getPictures(){
    var dataToSend = {};
    $.ajax({
        url:"../../Controller/Home/home.php",
        method:"post",
        cache:false,
        data:{getPicturesFull:JSON.stringify(dataToSend)},
        success:function(res){
            if(res != "fail" && res != "error"){
                var urlPic = [[]];                
                res = res.split("*");
                for(var i = 0; i < res.length-1;i++){
                    urlPic[[i,0]] = rewriteName(res[i].split("+")[0]); //Tipo
                    urlPic[[i,1]] = res[i].split("+")[1]; //thumbnail
                    urlPic[[i,2]] = res[i].split("+")[2]; //image
                }
                buildData(urlPic);
            }
            else{
                buildMessage(transactResult[readCookie("language")]['error']);
            }            
        }
    });
}
function rewriteName(name){
    var temp = name.trim();
    if(temp.includes(' '))
        name = name.split(' ')[0];    
    return name;
}
function buildData(urlPic){
    var kind = [];
    var x = 0;
    var flag = false;
    for(var i = 0; ;i++){
        for(var j = 0; ;j++){
            if(kind[j] == urlPic[[i,0]]){
                flag = true;
                break;
            }
            if(kind[j+1] == null)
                break;
        }
        if(!flag){
            kind[x] = urlPic[[i,0]];            
            x++;
        }
        flag = false;
        if(urlPic[[i+1,0]] == null)
            break;
    }    
    $.ajax({
        url:"rowGallery",
        success:function(html){
            for(var i = 0; i < x; i++){
                $(".bodyPage").append(html);
                $(".carousel:last-child .head h5").text(kind[i]);                    
                for(var j = 0; ;j++){                        
                    if(kind[i].includes(urlPic[[j,0]])){                            
                        $(".carousel:last-child .body").append(
                            "<img src='"+urlPic[[j,1]]+"' alt='"+urlPic[[j,2]]+"' />"
                        )
                        $(".carousel:last-child .body img:last-child").click(function(){
                            buildMessage(transactResult[readCookie("language")]['loadPicture']);
                            openImage($(this));
                        });
                    }
                    if(urlPic[[j+1,0]] == null){
                        break;
                    }
                }
            }
            $(".bodyPage .carousel:first-child").addClass("active");
            loadClick();
        }            
    });        
}
function loadClick(){
    $(".carousel .head").click(function(){
        if(!$(this).parent().hasClass("active")){
            $(this).parent().addClass("active");
        }
        else{
            $(this).parent().removeClass("active");
        }
    });
}
$(document).ready(function(){
    setTimeout(() => {
        loadPicturesCarousel();
    }, 450);
});
function loadPicturesCarousel(){
    var dataToSend = {};
    $.ajax({
        url:"../../Controller/Home/home.php",
        method:"post",
        cache:false,
        data:{getPictures:JSON.stringify(dataToSend)},
        success:function(res){
            var urlPic = [[]];
            var x = 0;            
            if(res != "fail" && res != "error"){
                res = res.split("*");
                for(var i = 0; i < res.length-1;i++){                    
                    urlPic[[x,0]] = res[i].split("+")[0];
                    urlPic[[x,1]] = res[i].split("+")[1];
                    console.log(urlPic[[x,0]]);
                    x++;
                }                
                $(".bodyPage .content.carousel").append(
                    "<img id='picCarousel' src='"+urlPic[[0,0]]+"' alt='"+urlPic[[0,1]]+"'>"
                );
                $(".bodyPage .content.carousel #picCarousel").click(function(){
                    openImage($(this));
                });
                    changePicture(urlPic,x);
            }
            else{
                buildMessage(transactResult[readCookie("language")]['error']);
            }
        }
    });
}
function changePicture(picture,limit){
    var x = 0;
    setInterval(() => {        
        if(x < limit-1){            
            x++;
        }
        else{
            x = 0;
        }
        $(".content.carousel #picCarousel").addClass("fade");
        setTimeout(() => {
            $(".content.carousel #picCarousel").attr("src",picture[[x,0]]);
            $(".content.carousel #picCarousel").attr("alt",picture[[x,1]]);
            setTimeout(() => {
                $(".content.carousel #picCarousel").removeClass("fade");
            }, 350);            
        }, 450);
    }, 10000);
    getLastProduct();
}
function getLastProduct(){
    var dataToSend = {};
    $.ajax({
        url:"../../Controller/Home/home.php",
        method:"post",
        cache:false,
        data:{getLastProduct:JSON.stringify(dataToSend)},
        success:function(res){
            if(res != "fail" && res != "error"){
                var urlPic = [[]];
                var x = 1;
                res = res.split("*");
                for(var i = 0; i < res.length-1;i++){
                    urlPic[[i,0]] = res[i].split("+")[0]; //Tipo
                    urlPic[[i,1]] = res[i].split("+")[1]; //thumbnail
                    urlPic[[i,2]] = res[i].split("+")[2]; //image
                    console.log(urlPic[[i,1]]);
                    if(x == 1){
                        $(".content.products h5").after(
                            "<div class='boxProduct'>"+
                                "<div class='product'>"+
                                    "<img src='"+urlPic[[i,1]]+"' alt='"+urlPic[[i,2]]+"'>"+
                                    "<div class='description'>"+
                                        "<label>"+urlPic[[i,0]]+"</label>"+
                                        "<a href='../home/producto?id="+urlPic[[i,0]]+"' data-translation-section='moreInfo'>Ver más</a>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                            "<div class='boxProduct'></div>"                        
                        );
                    }
                    else{
                        $(".content.products .boxProduct:last-child").append(
                            "<div class='product'>"+
                                "<img src='"+urlPic[[i,1]]+"' alt='"+urlPic[[i,2]]+"'>"+
                                "<div class='description'>"+
                                    "<label>"+urlPic[[i,0]]+"</label>"+
                                    "<a href='../home/producto?id="+urlPic[[i,0]]+"' data-translation-section='moreInfo'>Ver más</a>"+
                                "</div>"+
                            "</div>"
                        );                        
                    }

                    $(".content.products .product:last-child img ").click(function(){
                        openImage($(this));
                    });
                    x++;
                }                
            }
            else{
                buildMessage(transactResult[readCookie("language")]['error']);
            }            
        }
    });
    loadClickIndex();
}
function loadClickIndex(){
    $("#whatsapp").click(function(){
        window.open("https://api.whatsapp.com/send?phone=50684248172&text=Buenas, estoy buscando información");
    });
    $("#telegram").click(function(){
        window.open("https://t.me/devknight01");
    });
}
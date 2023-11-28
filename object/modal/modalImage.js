$(document).ready(function(){    
});
function openImage(img){                
    var modal = document.getElementById("modalImage");    
    // var img = img;
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");    
    modal.classList.add("active");
    modalImg.src = $(img).attr("alt");    
    var span = document.getElementsByClassName("closeImage")[0];
    $("body").addClass("blockScroll");
    span.onclick = function() {        
        modal.classList.remove("active");
        $("body").removeClass("blockScroll");
    }
}
(function(){
    /* 回到顶部 */
    var scrollTop=document.body.scrollTop||
        document.documentElement.scrollTop;
    window.onscroll=function(){
        var toTop = $("toTop");
        scrollTop=document.body.scrollTop||
            document.documentElement.scrollTop;
        if(scrollTop>400){
            toTop.style.height = "54px";
        }else{
            toTop.style.height = "0";
        }
        toTop.onclick = toTopAmi;
    }

    function toTopAmi(){
        if(scrollTop>0){
            document.documentElement.scrollTop=scrollTop-100;
            document.body.scrollTop=scrollTop-100;
            setTimeout(toTopAmi,10);
        }else{
            return;
        }
    }
})()

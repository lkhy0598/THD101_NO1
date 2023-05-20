$(document).ready(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() === 0) {
            // 導覽列陰影
            $('.HEADER_NAV')
                .removeClass('HEADER_NAV_SHADOW ');

            // LOGO形變
            $('.HEADERLOGO_BG_BOX')
                .addClass('HEADERLOGE_BG_TOP ')
                .removeClass('HEADERLOGE_BG_SCROLL ');

            $('.HEADERLOGO_PAW')
                .removeClass('HEADERLOGO_S ');

            $('.HEADER_LOGO_NAME')
                .removeClass('HEADERNAME_S ');


        } else {
            // 導覽列陰影
            $('.HEADER_NAV')
                .addClass('HEADER_NAV_SHADOW ');
            // LOGO形變
            $('.HEADERLOGO_BG_BOX')
                .addClass('HEADERLOGE_BG_SCROLL ')
                .removeClass('HEADERLOGE_BG_TOP ');

            $('.HEADERLOGO_PAW')
                .addClass('HEADERLOGO_S ');

            $('.HEADER_LOGO_NAME')
                .addClass('HEADERNAME_S ');
        }
    });
});







// css("display", "block") 

// ========= RWD NAV的LOGO 變化==========
$(document).ready(function () {
  
        $(".TOGGLE").click(function(){
            
  
           if ($("#TOGGLE")){
                $('.M_HEADER_NAV')
                .toggleClass('M_HEADER_NAV_SHADOW ');

                $('.M_HEADERLOGO_BG_BOX')
                .toggleClass('M_HEADERLOGE_BG_SCROLL ')
                .toggleClass('M_HEADERLOGE_BG_TOP ');

                $('.M_HEADERLOGO_PAW')
                    .toggleClass('M_HEADERLOGO_S ');

                $('.M_HEADER_LOGO_NAME')
                    .toggleClass('M_HEADERNAME_S')
           }

        });

});



// 按登入紐停止預設行為
$(document).ready(function(e) {
    $('.LOGIN').click(function(e){
	e.preventDefault();
    });
});



//手機板門診時間彈窗
$(document).ready(function() {
 var btn_el = document.getElementsByClassName("M_FUNTION_A2")[0];
        btn_el.addEventListener("click", function(e){
            // console.log("wdd");
            e.preventDefault();
            // var test = document.getElementsByClassName("bookwrapper")[0];
            // test.classList.add("-on");
            // test.classList.remove("-off");
            $(".M_TIME_TABLE").fadeIn(400);
            
        });
    var i = document.getElementsByClassName("CLOSE_TABLE")[0];
        i.addEventListener("click", function(e){
            // console.log("wdd");
            // $(i).toggleClass('XXX');
            e.preventDefault();
            $(".M_TIME_TABLE").fadeOut(300);
    

        });

    var c = document.getElementsByClassName("M_TIME_TABLE")[0];
        c.addEventListener("click", function(e){
            // console.log("wdd");
            // $(i).toggleClass('XXX');
            e.preventDefault();
            $(".M_TIME_TABLE").fadeOut(300);
    

        });

});


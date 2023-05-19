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









// ========= RWD nav ==========
$(document).ready(function () {
  
        $(".TOGGLE").click(function(){
            
            console.log("ta");
           if ($("#TOGGLE").css("display", "block") ){
                $('.M_HEADER_NAV')
                    .removeClass('M_HEADER_NAV_SHADOW ');

                $('.M_HEADERLOGO_BG_BOX')
                .addClass('M_HEADERLOGE_BG_TOP ')
                .removeClass('M_HEADERLOGE_BG_SCROLL ');

                $('.M_HEADERLOGO_PAW')
                    .removeClass('M_HEADERLOGO_S ');

                $('.M_HEADER_LOGO_NAME')
                    .removeClass('M_HEADERNAME_S ');
           } else {
                // 導覽列陰影
                $('.M_HEADER_NAV')
                .addClass('M_HEADER_NAV_SHADOW ');
                // LOGO形變
                $('.M_HEADERLOGO_BG_BOX')
                .addClass('M_HEADERLOGE_BG_SCROLL ')
                .removeClass('M_HEADERLOGE_BG_TOP ');

                $('.M_HEADERLOGO_PAW')
                .addClass('M_HEADERLOGO_S ');

                $('.M_HEADER_LOGO_NAME')
                .addClass('M_HEADERNAME_S ');
           }
         
            

        });

});
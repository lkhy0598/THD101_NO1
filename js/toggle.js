$(function(){
    $(".TOGGLE").click(function(){
        $('.TOGGLE > span').toggleClass('close');
        $('.TOGGLE').toggleClass('close');
        $(".M_HEADER_NAV > ul").slideToggle();
    });
});
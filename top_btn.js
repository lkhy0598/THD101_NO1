$(document).ready(function() {
  $("#js-top").click(function() {
      $('html, body').animate({
          scrollTop: $("body").offset().top
      }, 1000);
  });


  $("#js-f-top").click(function() {
    $('html, body').animate({
        scrollTop: $("body").offset().top
    }, 1000);
  });

  

  $(window).scroll(function(){
    let scrollTop = $(this).scrollTop();

    let bg = $('.BACKGROUND').height();

    if(scrollTop > 200){
      $("#js-top").fadeIn();
    }else {
      $("#js-top").fadeOut(10);
    };

    
    
    
  })
});







// const scrollToTopButton = document.getElementById('js-top');

// const scrollFunc = () => {

//   let y = document.getElementsByClassName('BACKGROUND')[0].scrollY;

//   if (y = 0) {
//     scrollToTopButton.className = "TOP_BTN SHOW";
//   } else {
//     scrollToTopButton.className = "TOP_BTN HIDE";
//   }

// };


// var g = document.getElementsByClassName('BACKGROUND')[0];
// g.addEventListener("scroll", scrollFunc);

//   const scrollToTop = () => {

//   const c = document.documentElement.scrollTop || document.body.scrollTop;
//     console.log(c);
//     if (c > 0) {
//       g.requestAnimationFrame(scrollToTop);
//       g.scrollTo(0, c - c / 10);
//     }

//   };

// scrollToTopButton.onclick = function(e) {
//   e.preventDefault();
//   scrollToTop();
// }
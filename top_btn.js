document.querySelector("#js-top").addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// $(document).ready(function() {
//   $("#js-top").click(function() {
//       $('html, body').animate({
//           scrollTop: $("body").offset().top
//       }, 800);
//   });
// });


// $(document).ready(function() {
//   $("#js-f-top").click(function() {
//       $('html, body').animate({
//           scrollTop: $("body").offset().top
//       }, 800);
//   });
// });





const scrollToTopButton = document.getElementById('js-top');

const scrollFunc = () => {

  let y = window.scrollY;

  if (y > 200) {
    scrollToTopButton.className = "TOP_BTN SHOW";
  } else {
    scrollToTopButton.className = "TOP_BTN HIDE";
  }

};

window.addEventListener("scroll", scrollFunc);

const scrollToTop = () => {

const c = document.documentElement.scrollTop || document.body.scrollTop;

  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 10);
  }

};

// scrollToTopButton.onclick = function(e) {
//   e.preventDefault();
//   scrollToTop();
// }
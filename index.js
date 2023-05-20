$(function(){
    $(".TOGGLE").click(function(){
        $('.TOGGLE > span').toggleClass('close');
        $('.TOGGLE').toggleClass('close');
        $(".M_HEADER_NAV > ul").slideToggle();
        


    });
  });


  

  window.addEventListener('scroll', checkBoxes)
  checkBoxes();
  function checkBoxes() {
      let triggerBottom = window.innerHeight*0.8
      let boxes = document.querySelectorAll('.CONSULTATION_UL');
      boxes.forEach(box => {
          const boxTop = box.getBoundingClientRect().top

          if(boxTop < triggerBottom) {
              box.classList.add('show')
          } else {
              box.classList.remove('show')
          }
      })
  };
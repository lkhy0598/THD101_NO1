let boxes = document.querySelectorAll('.CONSULTATION_UL')

      window.addEventListener('scroll', checkBoxes)
      checkBoxes();
      function checkBoxes() {
          let triggerBottom = window.innerHeight*0.8

          boxes.forEach(box => {
              const boxTop = box.getBoundingClientRect().top

              if(boxTop < triggerBottom) {
                  box.classList.add('show')
              } else {
                  box.classList.remove('show')
              }
          })
      }
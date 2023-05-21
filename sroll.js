let boxes = document.querySelectorAll('.SERVICES_ITEM')

      window.addEventListener('scroll', checkBoxes)
      checkBoxes();
      function checkBoxes() {
          let triggerBottom = window.innerHeight*0.8

          boxes.forEach(box => {
              const boxTop = box.getBoundingClientRect().top

              if(boxTop < triggerBottom) {
                  box.classList.add('SHOW')
              } else {
                  box.classList.remove('SHOW')
              }
          })
      }
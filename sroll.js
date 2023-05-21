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
      };




      let feature = document.querySelectorAll('.FEATURE_ITEM')

      window.addEventListener('scroll', checkFeature)
      checkFeature();
      function checkFeature() {
          let triggerBottom = window.innerHeight*0.9

          feature.forEach(box => {
              const boxTop = box.getBoundingClientRect().top

              if(boxTop < triggerBottom) {
                  box.classList.add('SHOW')
              } else {
                  box.classList.remove('SHOW')
              }
          })
      }
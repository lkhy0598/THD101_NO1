$(document).ready(function() {
    // PC版的預約浮動視窗
    $(".APPOINTMENT_TAG").click(function() {
      $(".APPOINTMENT").toggleClass('APPOINTMENT_ACTIVE');
      $(".APPOINTMENT").toggleClass('APPOINTMENT_HOVER');
    });
  
    $(".APPOINTMENT").hover(
      function() {
        if (!$(".APPOINTMENT").hasClass('APPOINTMENT_ACTIVE')) {
          $(this).addClass('APPOINTMENT_HOVER');
        }
      },
      function() {
        if (!$(".APPOINTMENT").hasClass('APPOINTMENT_ACTIVE')) {
          $(this).removeClass('APPOINTMENT_HOVER');
        }
      }
    );
    // 畫面滾動時收起視窗
    $(window).scroll(function () {
        $(".APPOINTMENT").removeClass('APPOINTMENT_ACTIVE');
        $(".APPOINTMENT").removeClass('APPOINTMENT_HOVER');
    });


    // RWD底下功能列的小時刻表
    $(".M_FUNTION_A2").click(function(e) {
        e.preventDefault();
        $(".M_TIME_TABLE").toggleClass('M_TIME_TABLE_ACTIVE');
    });
    // 畫面滾動時收起視窗
    $(window).scroll(function () {
        $(".M_TIME_TABLE").removeClass('M_TIME_TABLE_ACTIVE');
    });
  });
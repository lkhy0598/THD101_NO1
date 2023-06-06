var buttons = document.querySelectorAll('.ILLNESS_SIGN_BTN');

buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    // 切換按鈕的類別
    this.classList.toggle('ACTIVE');
  });
});
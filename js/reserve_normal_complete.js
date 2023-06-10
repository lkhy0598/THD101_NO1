//取得暫存中使用者在先前頁面填入的資料
var reserveData = JSON.parse(localStorage.getItem('reserveData'));

// reserveDate:預約日期
document.getElementById('reserve_date').textContent = reserveData.reserveDate; 

// reserveTime:預約時段
document.getElementById('reserve_time').textContent = reserveData.reserveTime; 

// 診間叫號系統

// 選擇按鈕元素
var nextButton = document.getElementById("nextButton");
var passButton = document.getElementById("passButton");

// 選擇計數器元素
var counter = document.getElementById("counter");

// 選擇預約人數元素
var reservationCount = document.getElementById("reservationCount");

// 選擇診間選項
var clinicRoom = document.getElementById("clinic_room");

// 初始化計數器值對應的診間數字
var counters = {
  "1": 0,
  "2": 0,
  "3": 0
};

// 檢查本地存儲中是否存在計數器值
if (localStorage.getItem("counters")) {
  // 如果存在，從本地存儲中讀取計數器值
  counters = JSON.parse(localStorage.getItem("counters"));
}

// 檢查本地存儲中是否存在選擇的診間值
if (localStorage.getItem("selectedRoom")) {
  // 如果存在，從本地存儲中讀取選擇的診間值
  var selectedRoom = localStorage.getItem("selectedRoom");
  clinicRoom.value = selectedRoom;
}

// 更新計數器元素的內容
updateCounter();

// 當下一個按鈕被點擊時，執行以下函數
nextButton.addEventListener("click", function () {
  // 獲取選中的診間值
  var selectedRoom = clinicRoom.value;

  // 將選中的診間值對應的計數器值加一
  counters[selectedRoom]++;

  // 更新計數器元素的內容
  updateCounter();

  // 將更新後的計數器值存儲到本地存儲中
  localStorage.setItem("counters", JSON.stringify(counters));
});

// 當過號按鈕被點擊時，執行以下函數
passButton.addEventListener("click", function () {
  // 獲取選中的診間值
  var selectedRoom = clinicRoom.value;

  // 將選中的診間值對應的計數器值加一
  counters[selectedRoom]++;

  // 更新計數器元素的內容，不改變計數器值
  updateCounter();

  // 將更新後的計數器值存儲到本地存儲中
  localStorage.setItem("counters", JSON.stringify(counters));
});

// 監聽選擇診間的改變事件
clinicRoom.addEventListener("change", function () {
  // 獲取選中的診間值
  var selectedRoom = clinicRoom.value;

  // 將選擇的診間值存儲到本地存儲中
  localStorage.setItem("selectedRoom", selectedRoom);

  // 更新計數器元素的內容
  updateCounter();
});

// 定義每天午夜（00:00）的時間
var midnight = new Date();
midnight.setHours(24, 0, 0, 0);

// 設定定時器，每秒檢查是否到達午夜
setInterval(function () {
  var currentTime = new Date();

  // 如果當前時間超過或等於午夜，則將計數器重設為零
  if (currentTime >= midnight) {
    resetCounters();
  }
}, 1000);

// 更新計數器元素的內容
function updateCounter() {
  var selectedRoom = clinicRoom.value;
  counter.textContent = counters[selectedRoom];
  // reservationCount.textContent = calculateReservationCount();
}

// 計算預約人數
function calculateReservationCount() {
  var total = 0;
  for (var key in counters) {
    total += counters[key];
  }
  return total;
}

// 重設計數器為零
function resetCounters() {
  counters = {
    "1": 0,
    "2": 0,
    "3": 0
  };

  // 更新計數器元素的內容
  updateCounter();

  // 將重設後的計數器值存儲到本地存儲中
  localStorage.setItem("counters", JSON.stringify(counters));

  // 更新午夜時間
  midnight.setDate(midnight.getDate() + 1);
  
}
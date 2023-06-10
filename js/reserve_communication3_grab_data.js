//取得暫存中使用者在先前頁面填入的資料
var reserveData = JSON.parse(localStorage.getItem('reserveData'));
var reserveCommunication2Data = JSON.parse(localStorage.getItem('reserveCommunication2Data'));

// reserveType:預約類型
document.getElementById('reserve_type').textContent = reserveData.reserveType;

// doctorChoices:指定醫師
document.getElementById('doctor_choices').textContent = reserveData.doctorChoices; 

// reserveDate:預約日期
document.getElementById('reserve_date').textContent = reserveData.reserveDate; 

// reserveTime:預約時段
document.getElementById('reserve_time').textContent = reserveData.reserveTime; 

// ownerName:主人姓名
document.getElementById('owner_name').textContent = reserveCommunication2Data.ownerName;

// phoneno:手機號碼
document.getElementById('phoneno').textContent = reserveCommunication2Data.phoneno;

// petSpecies:寵物姓名
document.getElementById('pet_name').textContent = reserveCommunication2Data.petName;

// petSpecies:寵物種類
document.getElementById('pet_species').textContent = reserveCommunication2Data.petSpecies;

// petAge:寵物年齡
document.getElementById('pet_age').textContent = reserveCommunication2Data.petAge;

// vaccinationOrNot:是否打過預防針
document.getElementById('vaccination_or_not').textContent = reserveCommunication2Data.vaccinationOrNot;


// otherIllnessSign:其他備註
document.getElementById('other_description').textContent = reserveCommunication2Data.otherDescription;

//導向確認完成寵物溝通預約
function Comfirm() {
    window.location.href = "../reserve_communication_complete.html";
}
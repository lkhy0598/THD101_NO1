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


function CommunicationReserveSub() {
    alert('預約成功！');
    // 抓使用者填入的預約表單內容填入資料庫

    // reserveType:預約類型
    var reserveType = reserveData.reserveType;
    // doctorChoices:指定醫師
    var doctorChoices = reserveData.doctorChoices;
    // reserveDate:預約日期
    var reserveDate = reserveData.reserveDate;
    // reserveTime:預約時段
    var reserveTime = reserveData.reserveTime;
    // ownerName:主人姓名
    var ownerName = reserveCommunication2Data.ownerName;
    // phoneno:手機號碼
    var phoneno = reserveCommunication2Data.phoneno;
    // petSpecies:寵物姓名
    var petName = reserveCommunication2Data.petName;
    // petSpecies:寵物種類
    var petSpecies = reserveCommunication2Data.petSpecies;
    // petAge:寵物年齡
    var petAge = reserveCommunication2Data.petAge;
    // vaccinationOrNot:是否打過預防針
    var vaccinationOrNot = reserveCommunication2Data.vaccinationOrNot;
    
    // otherIllnessSign:其他備註
    var otherIllnessSign = reserveCommunication2Data.otherDescription;

    $.ajax({
        method: "POST",

        url: "./php/submit_reserve.php",
        data: {
            // php:js
            RESERVE_TYPE: reserveType,
            DOCTOR_CHOICES: doctorChoices,
            RESERVE_DATE: reserveDate,
            RESERVE_TIME: reserveTime,
            OWNER_NAME: ownerName,
            PHONENO: phoneno,
            PET_NAME: petName,
            PET_SPECIES: petSpecies,
            PET_AGE: petAge,
            VACCINATION_OR_NOT: vaccinationOrNot,
            // SELECTED_ILLNESS_SIGN: selectedIllnessSign,
            OTHER_ILLNESS_SIGN: otherIllnessSign
        },
        dataType: "text",
        success: function (response) {
            alert('預約成功！');
            alert(response);

        },
        error: function (exception) {
            alert("ajax發生錯誤" + exception.status);
        }

    });
}

//導向確認完成寵物溝通預約
function Comfirm() {
    window.location.href = "reserve_communication_complete.html";
}
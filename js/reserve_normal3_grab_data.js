//取得暫存中使用者在先前頁面填入的資料
var reserveData = JSON.parse(localStorage.getItem('reserveData'));
var reserveNormal2Data = JSON.parse(localStorage.getItem('reserveNormal2Data'));

// reserveType:預約類型
document.getElementById('reserve_type').textContent = reserveData.reserveType;

// doctorChoices:指定醫師
document.getElementById('doctor_choices').textContent = reserveData.doctorChoices;

// reserveDate:預約日期
document.getElementById('reserve_date').textContent = reserveData.reserveDate;

// reserveTime:預約時段
document.getElementById('reserve_time').textContent = reserveData.reserveTime;

// ownerName:主人姓名
document.getElementById('owner_name').textContent = reserveNormal2Data.ownerName;

// phoneno:手機號碼
document.getElementById('phoneno').textContent = reserveNormal2Data.phoneno;

// petSpecies:寵物姓名
document.getElementById('pet_name').textContent = reserveNormal2Data.petName;

// petSpecies:寵物種類
document.getElementById('pet_species').textContent = reserveNormal2Data.petSpecies;

// petAge:寵物年齡
document.getElementById('pet_age').textContent = reserveNormal2Data.petAge;

// vaccinationOrNot:是否打過預防針
document.getElementById('vaccination_or_not').textContent = reserveNormal2Data.vaccinationOrNot;

// selectedIllnessSign:病徵類型
document.getElementById('selected_illness_sign').textContent = reserveNormal2Data.selectedIllnessSign;

// otherIllnessSign:其他病徵
document.getElementById('other_illness_sign').textContent = reserveNormal2Data.otherIllnessSign;

function NormalReserveSub() {
   
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
    var ownerName = reserveNormal2Data.ownerName;
    // phoneno:手機號碼
    var phoneno = reserveNormal2Data.phoneno;
    // petSpecies:寵物姓名
    var petName = reserveNormal2Data.petName;
    // petSpecies:寵物種類
    var petSpecies = reserveNormal2Data.petSpecies;
    // petAge:寵物年齡
    var petAge = reserveNormal2Data.petAge;
    // vaccinationOrNot:是否打過預防針
    var vaccinationOrNot = reserveNormal2Data.vaccinationOrNot;
    // selectedIllnessSign:病徵類型
    var selectedIllnessSign = reserveNormal2Data.selectedIllnessSign;
    // otherIllnessSign:其他病徵
    var otherIllnessSign = reserveNormal2Data.otherIllnessSign;

    $.ajax({
        method: "POST",

        url: "../php/submit_reserve.php",
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
            SELECTED_ILLNESS_SIGN: selectedIllnessSign,
            OTHER_ILLNESS_SIGN: otherIllnessSign
        },
        dataType: "text",
        success: function (response) {
            alert('預約成功！');
            // alert(response);
        },
        error: function (exception) {
            alert("ajax發生錯誤" + exception.status);
        }

    });
}

//導向確認完成寵物溝通預約
function Comfirm() {
    window.location.href = "./reserve_normal_complete.html";
}
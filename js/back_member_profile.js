Vue.createApp({
    data() {
        return {
            name: '',
            phone: '',
            email: '',
            address: '',
            searchPhone: '',
            searchName: '',
            searchResult: [],
            showModify: false,
            avatar: '',
            memberID: '',
            newmember_name:'',
            newmember_phone:'',
            newmember_email:'',
            newmember_address:'',
            new_pet_phone:'',
            new_pet_name:'',
            new_pet_gender:'',
            new_pet_age:'',
            new_pet_category:'',
            new_vaccines:'',
            searchPetResult: [],
            showAdd: false,
            current: 'search',
            petPhone: '',
            checkType: 'default',
            pedID:'',
            petAvatar:'',
            pet_phone_revise:'',
            pet_name_revise:'',
            pet_gender_revise:'',
            pet_category_revise:'',
            pet_age_revise:'',
            vaccines_revise:'',
            mask: false,
            reserve_name: '',
            reserve_phone:'',
            reserve_pet_name:'',
            reserve_pet_category:'',
            reserve_pet_age:'',
            reserve_vaccines:'',
            reserve_type:'',
            reserve_doctor:'',
            reserve_date:'',
            reserve_datetime:'',
            reserve_member_id:'',
            reserve_pet_id:'',
            reserve_symptom_type:'請簡述寵物病情'
        }
    },
    methods: {
        refreshPage() {
            location.reload();
        },
        doSearch() {
            const searchData = new FormData();
            searchData.append('phone', this.searchPhone);
            searchData.append('name', this.searchName);

            if (this.searchPhone === '' && this.searchName === '') {
                alert('請擇一填寫');
            } else {
                // axios.post('http://localhost/THD101_NO1/php/back_search_member.php', searchData)
                axios.post('../php/back_search_member.php', searchData)
                    .then(response => {
                        console.log(response.data);
                        this.searchResult = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },

        doReviseMember(member) {
            this.name = member.NAME;
            this.phone = member.PHONENO;
            this.email = member.EMAIL;
            this.address = member.ADDRESS;
            this.avatar = member.MEMBER_AVATAR;
            this.memberID = member.MEMBER_ID;
            this.current = 'modify';
        },

        doAddMember(){

            if (this.newmember_name === "") {
                alert("請輸入姓名");
            }else if (this.newmember_phone === "") {
                alert("請輸入手機號碼");
            }else if (this.newmember_email === "") {
                alert("請輸入電子信箱");
            }else if (this.newmember_address === "") {
                alert("請輸入通訊地址");
            }else {
                const newMemberData = new FormData();
                const files = $('#member_pic')[0].files;
                newMemberData.append('member_pic', files[0]);
                newMemberData.append('newmember_name', this.newmember_name);
                newMemberData.append('newmember_phone', this.newmember_phone);
                newMemberData.append('newmember_email', this.newmember_email);
                newMemberData.append('newmember_address', this.newmember_address);

                axios.post('../php/back_add_member_pet.php', newMemberData)
                .then(response => {
                    // console.log(response.data);
                    if (response.data == '新增成功') {
                        alert('新增成功');
                        this.current ='search';
                        this.refreshPage();
                    } else {
                        alert('新增失敗');
                    }
                })
                .catch(error => {
                    console.log(error);
                });

            }
            
        },
        newPicture(e){
            // 獲取預覽容器元素
            let previewMemberPic = document.getElementById('preview_member_pic');
            // 添加change事件監聽器
            // 獲取選擇的文件
            let file = e.target.files[0];
            // 創建文件讀取器
            let reader = new FileReader();
            // 設置文件讀取器的加載完成事件
                reader.onload = function (e) {
                // 創建圖像元素
                let img = document.createElement('img');
                // 設置預覽圖像的src屬性為讀取到的文件內容
                img.src = e.target.result;
                img.classList.add('PREVIEW_IMG');
                // 清空預覽容器
                previewMemberPic.innerHTML = '';
                // 將預覽的圖像元素添加到預覽容器中
                previewMemberPic.appendChild(img);
                }
            // 讀取文件內容
            reader.readAsDataURL(file);
            
        },

        doAddPet(){
            if (this.new_pet_phone === "") {
                alert("請輸入手機號碼");
            }else if (this.new_pet_name === "") {
                alert("請輸入寵物姓名");
            }else if (this.new_pet_gender === "") {
                alert("請選擇寵物性別");
            }else if (this.new_pet_age === "") {
                alert("請輸入寵物年齡");
            }else if (this.new_pet_category === "") {
                alert("請選擇寵物類型");
            }else if (this.new_vaccines === "") {
                alert("是否打過預防針");
            }else{
                const newPetData = new FormData();
                const files = $('#pet_pic')[0].files;
                newPetData.append('pet_pic', files[0]);
                newPetData.append('new_pet_phone', this.new_pet_phone);
                newPetData.append('new_pet_name', this.new_pet_name);
                newPetData.append('new_pet_gender', this.new_pet_gender);
                newPetData.append('new_pet_age', this.new_pet_age);
                newPetData.append('new_pet_category', this.new_pet_category);
                newPetData.append('new_vaccines', this.new_vaccines);

                axios.post('../php/back_add_pet.php', newPetData)
                .then(response => {
                    // console.log(response.data);
                    if (response.data == '新增成功') {
                        alert('新增成功');
                        this.current ='search';
                        this.refreshPage();
                    } else if(response.data == '新增失敗'){
                        alert('新增失敗');
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
        newPetPic(e){
            // 新增寵物照片
            var previewPetPic = document.getElementById('preview_pet_pic');
            let file = e.target.files[0];
            // console.log(file);
            let reader = new FileReader();
            // console.log(reader);
            reader.onload = function (e) {
                let img = document.createElement('img');
                img.src = e.target.result;
                img.classList.add('PREVIEW_IMG');
                previewPetPic.innerHTML = '';
                previewPetPic.appendChild(img);
            }
            reader.readAsDataURL(file);
            
        },
        new_pet_genderValue(e){
            this.new_pet_gender = e.target.value;
        },
        new_pet_categoryValue(e){
            this.new_pet_category = e.target.value;
        },
        new_vaccinesValue(e){
            this.new_vaccines = e.target.value;
        },
        doUpdateMember() {
            if (this.name === "") {
                alert("請輸入姓名");
            } else if (this.phone === "") {
                alert("請輸入手機號碼");
            } else if (this.email === "") {
                alert("請輸入電子信箱");
            } else if (this.address === "") {
                alert("請輸入通訊地址");
            } else {

                const memberData = new FormData();
                let files = document.querySelector('#member_pic_revise').files;
                memberData.append('member_pic_revise', files[0]);
                memberData.append('name_revise', this.name);
                memberData.append('phone_revise', this.phone);
                memberData.append('email_revise', this.email);
                memberData.append('address_revise', this.address);
                memberData.append('member_id', this.memberID);

                // console.log(memberData);

                // axios.post('http://localhost/THD101_NO1/php/back_update_member.php', memberData)
                axios.post('../php/back_update_member.php', memberData)
                    .then(response => {
                        // console.log(response.data);
                        if (response.data == '修改成功') {
                            alert('修改成功');
                            this.current ='search';
                            this.refreshPage();
                        } else {
                            alert('修改失敗');
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        uploadAvatar(e) {

            let previewMemberPicRevise = document.getElementById('preview_member_pic_revise');
            let file = e.target.files[0];
            // console.log(file);
            let reader = new FileReader();
            reader.onload = function (e) {
                let img = document.createElement('img');
                img.src = e.target.result;
                img.classList.add('PREVIEW_IMG');
                previewMemberPicRevise.innerHTML = '';
                previewMemberPicRevise.appendChild(img);
            }
            // console.log(reader);
            reader.readAsDataURL(file);
        },
        searchPet() {
            if (this.petPhone === '' && this.checkType === 'default') {
                alert('請擇一搜尋');
            } else{
                const petData = new FormData();
                petData.append('phone', this.petPhone);
                petData.append('type', this.checkType);
                
                axios.post('../php/back_pet_search_member.php', petData)
                    .then(response => {
                        console.log(response.data);
                        this.searchPetResult = response.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        checkTypeValue(e) {
            this.checkType = e.target.value;
        },
        doRevisePet(pet){
            this.current = 'pet';
            this.pet_phone_revise = pet.PHONENO;
            this.pet_name_revise = pet.PET_NAME;
            this.pet_gender_revise = pet.PET_GENDER;
            this.pet_category_revise = pet.PET_CATAGORY;
            this.pet_age_revise = pet.PET_AGE;
            this.vaccines_revise = pet.VACCI_OR_NOT;
            this.memberID = pet.MEMBER_ID;
            this.pedID = pet.PET_ID;
            this.petAvatar = pet.PET_AVATAR;
        },
        uploadPetAvatar(e){
            // 修改寵物照片
            let previewPetPicRevise = document.getElementById('preview_pet_pic_revise');
            let file = e.target.files[0];
            // console.log(file);
            let reader = new FileReader();
            // console.log(reader);
            reader.onload = function (e) {
                let img = document.createElement('img');
                img.src = e.target.result;
                img.classList.add('PREVIEW_IMG');
                previewPetPicRevise.innerHTML = '';
                previewPetPicRevise.appendChild(img);
            }
            reader.readAsDataURL(file);
            
        },
        gender_reviseValue(e){
            this.pet_gender_revise = e.target.value;
        },
        category_reviseValue(e){
            this.pet_category_revise = e.target.value;
        },
        vaccines_reviseValue(e){
            this.vaccines_revise= e.target.value;
        },
        doUpdatePet(){
            if (this.pet_phone_revise === "") {
                alert("請輸入手機號碼");
            } else if (this.pet_name_revise === "") {
                alert("請輸入寵物姓名");
            } else if (this.pet_gender_revise === "") {
                alert("請輸入寵物姓別");
            } else if (this.pet_category_revise === "") {
                alert("請輸入寵物類型");
            } else if (this.new_pet_age === "") {
                alert("請輸入寵物年齡");
            }else if (this.vaccines_revise === "") {
                alert("是否打過預防針");
            }else{
                const updataPetData = new FormData();
                let files = document.querySelector('#pet_pic_revise').files;
                updataPetData.append('pet_pic_revise', files[0]);
                updataPetData.append('pet_name_revise', this.pet_name_revise);
                updataPetData.append('pet_phone_revise', this.pet_phone_revise);
                updataPetData.append('pet_gender_revise', this.pet_gender_revise);
                updataPetData.append('pet_category_revise', this.pet_category_revise);
                updataPetData.append('pet_age_revise', this.pet_age_revise);
                updataPetData.append('member_id_pet', this.memberID);
                updataPetData.append('pet_id', this.petID);

                axios.post('../php/back_update_pet.php', updataPetData)
                    .then(response => {
                        // console.log(response.data);
                        if (response.data == '修改成功') {
                            alert('修改成功');
                            this.current = 'search'
                            this.refreshPage();
                        } else {
                            alert('修改失敗');
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        doReserve(pet){
            this.current = 'reserve';
            this.mask = true;
            this.reserve_name = pet.NAME;
            this.reserve_phone = pet.PHONENO;
            this.reserve_pet_name = pet.PET_NAME;
            this.reserve_pet_category = pet.PET_CATAGORY;
            this.reserve_pet_age = pet.PET_AGE;
            this.reserve_vaccines = pet.VACCI_OR_NOT;
            this.reserve_member_id = pet.MEMBER_ID;
            this.reserve_pet_id = pet.PET_ID;
        },
        reserve_typeValue(e) {
            this.reserve_type = e.target.value;
        },
        reserve_doctorValue(e) {
            this.reserve_doctor = e.target.value;
        },
        reserve_datetimeValue(e) {
            this.reserve_datetime = e.target.value;
        },
        pet_categoryValue(e) {
            this.reserve_pet_category = e.target.value;
        },
        reserve_vaccinesValue(e) {
            this.reserve_vaccines = e.target.value;
        },
        doAddReserve(){
            if (this.reserve_type === "") {
                alert("請選擇預約類型");  
            }else if (this.reserve_doctor === "") {
                alert("請選擇指定醫師");
            }else if (this.reserve_date === "") {
                alert("請輸入預約日期");
            }else if (this.reserve_datetime === "default") {
                alert("請選擇預約時段");
            }else if (this.reserve_pet_name === "") {
                alert("請輸入寵物姓名");
            }else if (this.reserve_pet_category === "") {
                alert("請選擇寵物類型");
            }else if (this.reserve_pet_age === "") {
                alert("請輸入年齡");
            }else if (this.reserve_vaccines === "") {
                alert("是否打過預防針");
            }else if (this.reserve_symptom_type === "") {
                alert("請輸入病徵類型");
            }else {
                const reserveData = new FormData();
                reserveData.append('reserve_type', this.reserve_type);
                reserveData.append('reserve_doctor', this.reserve_doctor);
                reserveData.append('reserve_date', this.reserve_date);
                reserveData.append('reserve_datetime', this.reserve_datetime);
                reserveData.append('reserve_name', this.reserve_name);
                reserveData.append('reserve_phone', this.reserve_phone);
                reserveData.append('reserve_pet_name', this.reserve_pet_name);
                reserveData.append('reserve_pet_category', this.reserve_pet_category);
                reserveData.append('reserve_pet_age', this.reserve_pet_age);
                reserveData.append('reserve_vaccines', this.reserve_vaccines);
                reserveData.append('reserve_member_id', this.reserve_member_id);
                reserveData.append('reserve_pet_id', this.reserve_pet_id);
                reserveData.append('reserve_symptom_type', this.reserve_symptom_type);

                axios.post('../php/back_add_reserve.php', reserveData)
                    .then(response => {
                        // console.log(response.data);
                        if (response.data == '掛號預約成功') {
                            alert('掛號預約成功');
                            this.current = 'search';
                            this.refreshPage();
                        } else  if(response.data == '住宿預約成功'){
                            alert('掛號預約成功');
                            this.current = 'search';
                            this.refreshPage();
                            
                        } else {
                            alert('修改失敗');
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    } 
}).mount('#members');


// 新增寵物
function doAddPet() {
    const new_pet_phone = $('#new_pet_phone').val().trim();
    const new_pet_name = $('#new_pet_name').val().trim();
    const new_pet_gender = $('#new_pet_gender option:selected').val();
    const new_pet_age = $('#new_pet_age').val().trim();
    const new_pet_category = $('#new_pet_category option:selected').val();
    const new_vaccines = $('#new_vaccines option:selected').val();

    if (new_pet_phone === "") {
        alert("請輸入手機號碼");
        return false;
    }
    if (new_pet_name === "") {
        alert("請輸入寵物姓名");
        return false;
    }
    if (new_pet_gender === "") {
        alert("請選擇寵物性別");
        return false;
    }
    if (new_pet_age === "") {
        alert("請輸入寵物年齡");
        return false;
    }
    if (new_pet_category === "") {
        alert("請選擇寵物類型");
        return false;
    }
    if (new_vaccines === "") {
        alert("是否打過預防針");
        return false;
    }

    const formData = new FormData();
    const files = $('#pet_pic')[0].files;
    formData.append('pet_pic', files[0]);
    formData.append('new_pet_phone', new_pet_phone);
    formData.append('new_pet_name', new_pet_name);
    formData.append('new_pet_gender', new_pet_gender);
    formData.append('new_pet_age', new_pet_age);
    formData.append('new_pet_category', new_pet_category);
    formData.append('new_vaccines', new_vaccines);

    $.ajax({
        method: "POST",
        url: "http://localhost/THD101_NO1/php/back_add_pet.php",
        // url:"../php/back_add_pet.php",
        data: formData,
        dataType: "text",
        // 告訴jQuery不要去處理發送的資料
        processData: false,
        // 告訴jQuery不要去設定Content-Type請求
        contentType: false,
        success: function (response) {
            alert(response);
            location.href = '_back_member_profile.html'
            // $('.BACK_ADD_NEW_MEMBER').hide();
            // $('.BACK_MEMBER_PROFILE').show();
        },
        error: function (exception) {
            alert("發生錯誤: " + exception.status);
        }
    })


}











const app = Vue.createApp({
    data() {
        return {
            shoppingCartItems: [], // 购物车项数据
            cartItemCount: 0, // 购物车项数量
            paymentId: '',
            memberId: ''
        };
    },
    created() {
        this.paymentId = '';
        const storedData = JSON.parse(localStorage.getItem('cartItems')); // 将localStorage中的数据解析为JavaScript对象
        if (storedData && Array.isArray(storedData)) {
            this.shoppingCartItems = storedData;
        }
            this.cartItemCount = this.shoppingCartItems.reduce((total, item) => total + item.quantity, 0); // 计算购物车项的数量总和
        
        const storedData2 = JSON.parse(localStorage.getItem('order')); // 将localStorage中的数据解析为JavaScript对象
        if (storedData2 && storedData2.TOTAL) {
            this.totalAmount = storedData2.TOTAL;
        }

        $.ajax({
            url: '../php/checksession.php',
            // url: 'http://localhost/THD101_NO1/php/checksession.php',
            type: 'POST',
            dataType: 'text',
            success: response => {
                const member_id = response.trim();
                this.memberId = member_id;
                $.ajax({
                    url: '../php/shopping_cart2.php',
                    // url: 'http://localhost/THD101_NO1/php/shopping_cart2.php',
                    type: 'POST',
                    data: { member_id: member_id },
                    dataType: 'json',
                    success: response => {
                        // 处理cartmember_voucher.php的响应
                        // console.log(response);
                        this.memberinfo = response[0];
                        // 将属性值赋给对应的输入框
                        $('#MEMBERNAME').val(this.memberinfo.NAME);
                        $('#MEMBERMAIL').val(this.memberinfo.EMAIL);
                        $('#MEMBERPHONE').val(this.memberinfo.PHONENO);

                    
                    },
                    error: error => {
                        // 处理错误
                        console.error(error);
                    }
                });
            },
            error: error => {
                // 处理错误
                console.error(error);
            }
    })
    const order = JSON.parse(localStorage.getItem('order'));
    this.paymentId = order ? order.PAYMENT_ID : null;
    
    },
    mounted() {
        let a = 0;
        const viewport = window.innerWidth;
        if (viewport > 414) {
            $('.SHOPPINGCART_ALLLIST').hide();
            $('.SHOPPINGCARTP2_ORDERTEXT').click(function () {
                $('.SHOPPINGCART_ALLLIST').slideToggle('slow');
                if (a === 0) {
                    $('.SHOPPINGCARTP2_ORDERARR').css({ transform: 'rotate(-180deg)' });
                a = 1;
                } else {
                    $('.SHOPPINGCARTP2_ORDERARR').css({ transform: 'rotate(0deg)' });
                a = 0;
                }
            });
        }
        if (viewport <= 414) {
            $('.SHOPPINGCART_ITEMLIST--M').hide();
            $('.SHOPPINGCARTP2_ORDERTEXTALL .SHOPPINGCARTP2_ORDERTEXT').click(function () {
                $('.SHOPPINGCART_ITEMLIST--M').slideToggle('slow');
                if (a === 0) {
                    $('.SHOPPINGCARTP2_ORDERARR').css({ transform: 'rotate(-180deg)' });
                    a = 1;
                } else {
                    $('.SHOPPINGCARTP2_ORDERARR').css({ transform: 'rotate(0deg)' });
                    a = 0;
                }
            });
        }
    },
    methods: {
        getFirstImage(imageSourceArray) {
            if (Array.isArray(imageSourceArray) && imageSourceArray.length > 0) {
                return imageSourceArray[0];
            }
            return ''; // 如果没有图像路径，则返回一个空字符串或默认的图像路径
        },
        getImagesArray(imageSource) {
            if (imageSource) {
              // 处理图像路径，返回图像路径数组
              // 这里只是一个示例，您需要根据实际情况进行处理
                return imageSource.split(',');
            }
            return []; // 如果没有图像路径，则返回一个空数组
        },
        updateInventory() {
            const productIds = this.shoppingCartItems.map(item => item.PRODUCT_ID);
    
            $.ajax({
                url: '../php/shopping_cart.php',
                // url: 'http://localhost/THD101_NO1/php/shopping_cart.php',
                type: 'GET',
                dataType: 'json',
                data: {
                ids: JSON.stringify(productIds) // 将所有的productId组成的数组转换为JSON字符串并作为参数传递给PHP
                },
            success: response => {
                const inventoryData = response; // 假设响应数据是一个包含了产品 ID 和对应的 INVENTORY 值的数组
                // 遍历购物车项数组
                this.shoppingCartItems.forEach(item => {
                    const productId = item.PRODUCT_ID;

                  // 查找相应的 INVENTORY 值并设置给购物车项对象
                    const inventory = inventoryData.find(data => data.PRODUCT_ID === productId);
                    if (inventory) {
                        item.INVENTORY = inventory.INVENTORY;
                        // 更新localStorage中的INVENTORY值
                        const storedData = JSON.parse(localStorage.getItem('cartItems'));
                        if (storedData && Array.isArray(storedData)) {
                            const updatedItems = storedData.map(storedItem => {
                                if (storedItem.PRODUCT_ID === productId) {
                                    storedItem.INVENTORY = inventory.INVENTORY;
                                }
                            return storedItem;
                        });
                        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
                        }
                    }
                });
            },
            error: error => {
                // 处理错误
                console.error(error);
                }
            });
        },
        handlePayment() {
            // 从localStorage中获取产品ID
            const storedData = JSON.parse(localStorage.getItem('cartItems'));
            const productIds = storedData.map(item => item.PRODUCT_ID);
        
            // 检查数量是否小于库存
            const quantityLessThanInventory = this.shoppingCartItems.some(item => {
                const storedItem = storedData.find(storedItem => storedItem.PRODUCT_ID === item.PRODUCT_ID);
                // console.log('Quantity:', item.quantity);
                // console.log('Inventory:', storedItem.INVENTORY);
                return item.quantity > storedItem.INVENTORY; // 修改为大于号以检查库存是否小于数量
            });
        
            // console.log('Quantity less than Inventory:', quantityLessThanInventory);
        
            if (quantityLessThanInventory) {
                // 跳转回购物车页面
                window.location.href = './shopping_cart.html';
                return; // 添加return语句以阻止继续执行后面的代码
            }
            
              // 执行AJAX请求以更新库存和localStorage
            this.updateInventory();

            // 验证表单并进行页面跳转
            this.submitForm();
                
        },
        submitForm() {
            // 验证表单并进行页面跳转
            if (this.validateForm()) {
              // 获取HTML的值
                const MEMBER_ID = this.memberId;
                const RECIPIENT = document.getElementById('RECIPIENT').value;
                const RE_EMAIL = document.getElementById('CARTINBOX').value;
                const RE_PHONE_NO = document.getElementById('RECIPIENTPHONE').value;
                const orderComment = document.getElementById('MEMO').value;
                const ORDER_COMMENT = orderComment !== '' ? orderComment : null;

                const orderString = localStorage.getItem('order');
                const order = JSON.parse(orderString);
                const DELIVERY_METHOD_ID = order ? order.DELIVERY_METHOD_ID : null;
                const PAYMENT_ID = order ? order.PAYMENT_ID : null;
                const TOTAL = order ? order.TOTAL : null;
                const VOUCHER_ID = order ? order.VOUCHER_ID : null;

                const cartItemString = localStorage.getItem('cartItems');
                const cartItems = JSON.parse(cartItemString);
                // console.log(cartItems)
                let items = [];
                // 建立新的陣列來存儲所需的值
                if (cartItems && Array.isArray(cartItems)) {
                    items = cartItems.map(item => {
                        const { PRODUCT_ID, PRODUCT_PRICE } = item;
                        const quantity = item.quantity;
                        const SUBTOTAL = PRODUCT_PRICE * quantity;
                        return { PRODUCT_ID, PRICE: PRODUCT_PRICE, ORDER_AMOUNT: quantity, SUBTOTAL };
                    });
                }
                let PAY_STATE_ID = null;
                if (this.paymentId !== '2') {
                    PAY_STATE_ID = 4;
                } else {
                    PAY_STATE_ID = 1;
                }
                const data = {
                    MEMBER_ID,
                    RECIPIENT,
                    RE_EMAIL,
                    RE_PHONE_NO,
                    ORDER_COMMENT,
                    DELIVERY_METHOD_ID,
                    PAYMENT_ID,
                    TOTAL,
                    VOUCHER_ID,
                    items, // 傳遞 items 陣列
                    PAY_STATE_ID
                };
                // 执行AJAX请求将值传递给PHP处理
              // 请根据实际情况替换为您的AJAX请求代码
                // console.log(data);
            $.ajax({
                url: '../php/shopping_cart2pay.php',
                // url: 'http://localhost/THD101_NO1/php/shopping_cart2pay.php',
                type: 'POST',
                dataType: 'text',
                data: data,
                success: response => {
                    // console.log(response)
                    if (response === "OK") {
                        // console.log(response)
                        // 清空 localStorage
                        localStorage.clear();
            
                        // 跳轉到下一頁
                        window.location.href = './shopping_cartp3.html';
                    } else {
                        // 處理回傳值不是 "OK" 的情況
                        console.error('Invalid response:', response);
                    }
                },
                error: error => {
                    // 處理錯誤
                    console.error(error);
                }
                });
            }
        },
        validateForm() {
            var isValid = true;
                // 進行收件人姓名(RECIPIENT)的驗證
                var recipientInput = $('#RECIPIENT');
                var recipientValue = recipientInput.val().trim();
                var errorElement1 = recipientInput.siblings('.INPUTERROR');
                var errorElement2 = recipientInput.siblings('.INPUTERROR2');

                var recipientRegex = /^[\u4E00-\u9FFFa-zA-Z\s]+$/;
                if (recipientValue.trim() === '') {
                errorElement1.addClass('WRONG');
                errorElement2.removeClass('WRONG');
                $('#RECIPIENT').addClass('ERROROUTLINE').removeClass('TRUEOUTLINE');
                isValid = false;
                } else if (recipientValue.length < 2 || !recipientRegex.test(recipientValue)) {
                errorElement1.removeClass('WRONG');
                errorElement2.addClass('WRONG');
                $('#RECIPIENT').addClass('ERROROUTLINE').removeClass('TRUEOUTLINE');
                isValid = false;
                } else {
                errorElement1.removeClass('WRONG');
                errorElement2.removeClass('WRONG');
                }

                // 進行電子信箱(CARTINBOX)的驗證
                var emailInput = $('#CARTINBOX');
                var emailValue = emailInput.val().trim();
                var emailErrorElement1 = emailInput.siblings('.INPUTERROR');
                var emailErrorElement2 = emailInput.siblings('.INPUTERROR2');

                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailValue === '') {
                emailErrorElement1.addClass('WRONG');
                emailErrorElement2.removeClass('WRONG');
                $('#CARTINBOX').addClass('ERROROUTLINE').removeClass('TRUEOUTLINE');
                isValid = false;
                } else if (!emailRegex.test(emailValue)) {
                emailErrorElement1.removeClass('WRONG');
                emailErrorElement2.addClass('WRONG');
                $('#CARTINBOX').addClass('ERROROUTLINE').removeClass('TRUEOUTLINE');
                isValid = false;
                } else {
                emailErrorElement1.removeClass('WRONG');
                emailErrorElement2.removeClass('WRONG');
                }

                // 進行連絡手機(RECIPIENTPHONE)的驗證
                var phoneInput = $('#RECIPIENTPHONE');
                var phoneValue = phoneInput.val().trim();
                var phoneErrorElement1 = phoneInput.siblings('.INPUTERROR');
                var phoneErrorElement2 = phoneInput.siblings('.INPUTERROR2');

                var phoneRegex = /^(\+?886-?|0)?9\d{8}$/;
                if (phoneValue === '') {
                phoneErrorElement1.addClass('WRONG');
                phoneErrorElement2.removeClass('WRONG');
                $('#RECIPIENTPHONE').addClass('ERROROUTLINE').removeClass('TRUEOUTLINE');
                isValid = false;
                } else if (!phoneRegex.test(phoneValue)) {
                phoneErrorElement1.removeClass('WRONG');
                phoneErrorElement2.addClass('WRONG');
                $('#RECIPIENTPHONE').addClass('ERROROUTLINE').removeClass('TRUEOUTLINE');
                isValid = false;
                } else {
                phoneErrorElement1.removeClass('WRONG');
                phoneErrorElement2.removeClass('WRONG');
                }
                if (this.paymentId !== '2') {
                var cardNumberInput = $('#CARDNUMBER');
                var cardNumberValue = cardNumberInput.val().replace(/-/g, ''); // 移除所有現有的連字符
                var cardNumberErrorElement1 = cardNumberInput.siblings('.INPUTERROR');
                var cardNumberErrorElement2 = cardNumberInput.siblings('.INPUTERROR2');

                if (cardNumberValue === '') {
                cardNumberErrorElement1.addClass('WRONG');
                cardNumberErrorElement2.removeClass('WRONG');
                $('#CARDNUMBER').addClass('ERROROUTLINE').removeClass('TRUEOUTLINE');
                isValid = false;
                } else if (!isValidLuhn(cardNumberValue)) {
                cardNumberErrorElement1.removeClass('WRONG');
                cardNumberErrorElement2.addClass('WRONG');
                $('#CARDNUMBER').addClass('ERROROUTLINE').removeClass('TRUEOUTLINE');
                isValid = false;
                } else {
                cardNumberErrorElement1.removeClass('WRONG');
                cardNumberErrorElement2.removeClass('WRONG');
                }

                function isValidLuhn(cardNumber) {
                    let newCardNum = cardNumber.replace(/-/g, "");
                    let sum = evenNum(newCardNum) + oddNum(newCardNum);
                    let resultNum = sum % 10;
                    if (resultNum !== 0) {
                        resultNum = 10 - resultNum;
                    }
                    return resultNum === newCardNum[15] * 1;
                    }

                    // 偶数位加总
                    function evenNum(newCardNum) {
                    let sum = 0;
                    for (let i = 1; i <= 13; i += 2) {
                        let resultNum = Number(newCardNum[i]);
                        sum += resultNum;
                    }
                    return sum;
                    }

                    // 奇数位加总
                    function oddNum(newCardNum) {
                    let sum = 0;
                    for (let i = 0; i <= 15; i += 2) {
                        let resultNum = Number(newCardNum[i]) * 2;
                        if (resultNum >= 10) {
                        resultNum -= 9;
                        }
                        sum += resultNum;
                    }
                    return sum;
                    }

                // 進行持卡人姓名(CARDOWNER)的驗證
                var cardOwnerInput = $('#CARDOWNER');
                var cardOwnerValue = cardOwnerInput.val().trim();
                var cardOwnerErrorElement1 = cardOwnerInput.siblings('.INPUTERROR');
                var cardOwnerErrorElement2 = cardOwnerInput.siblings('.INPUTERROR2');

                var cardOwnerRegex = /^[\u4E00-\u9FFFa-zA-Z\s]+$/;
                if (cardOwnerValue === '') {
                cardOwnerErrorElement1.addClass('WRONG');
                cardOwnerErrorElement2.removeClass('WRONG');
                $('#CARDOWNER').addClass('ERROROUTLINE').removeClass('TRUEOUTLINE');
                isValid = false;
                } else if (cardOwnerValue.length < 2 || !cardOwnerRegex.test(cardOwnerValue)) {
                cardOwnerErrorElement1.removeClass('WRONG');
                cardOwnerErrorElement2.addClass('WRONG');
                $('#CARDOWNER').addClass('ERROROUTLINE').removeClass('TRUEOUTLINE');
                isValid = false;
                } else {
                cardOwnerErrorElement1.removeClass('WRONG');
                cardOwnerErrorElement2.removeClass('WRONG');
                }

                // 進行信用卡有效期限(CARDEXPIRYDATE)的驗證
                var cardExpiryDateInput = $('#CARDEXPIRYDATE');
                var cardExpiryDateValue = cardExpiryDateInput.val().trim();
                var cardExpiryDateErrorElement1 = cardExpiryDateInput.siblings('.INPUTERROR');
                var cardExpiryDateErrorElement2 = cardExpiryDateInput.siblings('.INPUTERROR2');

                if (cardExpiryDateValue === '') {
                cardExpiryDateErrorElement1.addClass('WRONG');
                cardExpiryDateErrorElement2.removeClass('WRONG');
                $('#CARDEXPIRYDATE').addClass('ERROROUTLINE').removeClass('TRUEOUTLINE');
                isValid = false;
                } else if (cardExpiryDateValue.length < 4) {
                cardExpiryDateErrorElement1.removeClass('WRONG');
                cardExpiryDateErrorElement2.addClass('WRONG');
                $('#CARDEXPIRYDATE').addClass('ERROROUTLINE').removeClass('TRUEOUTLINE');
                isValid = false;
                } else {
                cardExpiryDateErrorElement1.removeClass('WRONG');
                cardExpiryDateErrorElement2.removeClass('WRONG');
                }

                // 進行信用卡安全碼(CARDCVC)的驗證
                var cardCVCInput = $('#CARDCVC');
                var cardCVCValue = cardCVCInput.val().trim();
                var cardCVCErrorElement1 = cardCVCInput.siblings('.INPUTERROR');
                var cardCVCErrorElement2 = cardCVCInput.siblings('.INPUTERROR2');

                if (cardCVCValue === '') {
                cardCVCErrorElement1.addClass('WRONG');
                cardCVCErrorElement2.removeClass('WRONG');
                $('#CARDCVC').addClass('ERROROUTLINE').removeClass('TRUEOUTLINE');
                isValid = false;
                } else if (cardCVCValue.length < 3) {
                cardCVCErrorElement1.removeClass('WRONG');
                cardCVCErrorElement2.addClass('WRONG');
                $('#CARDCVC').addClass('ERROROUTLINE').removeClass('TRUEOUTLINE');
                isValid = false;
                } else {
                cardCVCErrorElement1.removeClass('WRONG');
                cardCVCErrorElement2.removeClass('WRONG');
                }
                }

            return isValid;
        }
    }

});


app.mount("#SHOPPINGCART2VUE");
const app = Vue.createApp({
    data() {
        return {
            memberId: '',
            createDate:'',
            deliveryMethod:'',
            deliveryState:'',
            name:'',
            orderComment:'',
            orderState:'',
            paymentMethod:'',
            paymentState:'',
            phoneNo:'',
            recipient:'',
            reEmail:'',
            rePhoneNo:'',
            total:'',
            products: []

        }
    },
    created() {
        $.ajax({
            url: '../php/checksession.php',
            // url: 'http://localhost/THD101_NO1/php/checksession.php',
            type: 'POST',
            dataType: 'text',
            success: response => {
                const member_id = response.trim();
                this.memberId = member_id;
                $.ajax({
                    url: '../php/shopping_cart3.php',
                    // url: 'http://localhost/THD101_NO1/php/shopping_cart3.php',
                    type: 'POST',
                    data: { member_id: member_id },
                    dataType: 'json',
                    success: response => {
                        // console.log(response)
                        const data = response;
                        this.createDate = data.CREATE_DATE;
                        this.deliveryMethod = data.DELIVERY_METHOD;
                        this.deliveryState = data.DELIVERY_STATE;
                        this.name = data.NAME;
                        this.orderComment = data.ORDER_COMMENT;
                        this.orderState = data.ORDER_STATE;
                        this.paymentMethod = data.PAYMENT_METHOD;
                        this.paymentState = data.PAYMENT_STATE;
                        this.phoneNo = data.PHONENO;
                        this.recipient = data.RECIPIENT;
                        this.reEmail = data.RE_EMAIL;
                        this.rePhoneNo = data.RE_PHONE_NO;
                        this.total = data.TOTAL;
                        this.products = data.PRODUCTS.map(product => {
                            const { IMG_SOURCE, ...rest } = product; // 使用解构赋值分离IMG_SOURCE和其他属性
                            const imgSources = IMG_SOURCE.split(',');
                            const firstImgSource = imgSources[0].trim(); // 获取第一个路径并去除首尾空格
                            return {
                                ...rest, // 保留其他属性
                                IMG_SOURCE: firstImgSource // 只取第一个路径
                            };
                        });
                    
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
    },
    methods: {
        getFirstImagePath(imgSource) {
            const imgSources = imgSource.split(',');
            return imgSources[0].trim() || ''; // 处理数组为空的情况，并去除首尾空格
        },
        submitMemo() {
            const memoTextArea = document.getElementById('memo');
            this.orderComment = memoTextArea.value;
            // 在这里可以执行其他提交逻辑或发送请求等操作
            // console.log({
            //     member_id: this.memberId,
            //     orderComment: this.orderComment 
            // });
            $.ajax({
                url: '../php/shopping_cart3_updateoc.php',
                // url: 'http://localhost/THD101_NO1/php/shopping_cart3_updateoc.php',
                type: 'POST',
                data: { 
                    member_id: this.memberId,
                    orderComment: this.orderComment 
                },
                dataType: 'text',
                success: response => {
                    if (response === "OK") {
                        // 执行特定操作
                        window.location.href = './shopping_cart.html';
                    } else {
                        // 响应不是 "OK"，处理其他情况
                        console.log("操作失败");
                    }
                },
                error: error => {
                    // 处理错误
                    console.error(error);
                }
            });
        }
    },
    computed: {
        totalQuantity() {
            return this.products.reduce((total, product) => total + product.ORDER_AMOUNT, 0);
        },
        maskedEmail() {
            const emailParts = this.reEmail.split("@");
            const username = emailParts[0];
            const maskedUsername = username.slice(0, -3) + "***"; // 将最后三个字符替换为***
            const domain = emailParts[1];
            return maskedUsername + "@" + domain;
        },
        maskedrePhoneNo() {
            const maskedPhone = this.rePhoneNo.slice(0, -3) + "***";
            return maskedPhone;
        },
        maskedPhoneNo() {
            const maskedPhone = this.phoneNo.slice(0, -3) + "***";
            return maskedPhone;
        }
    },



});


app.mount("#SHOPPINGCART3VUE");
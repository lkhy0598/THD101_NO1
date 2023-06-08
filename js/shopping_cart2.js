const app = Vue.createApp({
    data() {
        return {
            shoppingCartItems: [], // 购物车项数据
            cartItemCount: 0, // 购物车项数量
        };
    },
    created() {
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
            url: 'http://localhost/THD101_NO1/php/checksession.php',
            type: 'POST',
            dataType: 'text',
            success: response => {
                const member_id = response.trim();
                $.ajax({
                    url: 'http://localhost/THD101_NO1/php/shopping_cart2.php',
                    type: 'POST',
                    data: { member_id: member_id },
                    dataType: 'json',
                    success: response => {
                        // 处理cartmember_voucher.php的响应
                        console.log(response);
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
        }
    }

});


app.mount("#SHOPPINGCART2VUE");
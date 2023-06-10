const app = Vue.createApp({
    data() {
        return {
            productId: null,
            shoppingItems: {
                PRODUCT_TITLE: '',
                PRODUCT_PRICE: '',
                INVENTORY: '',
                IMG_SOURCE_ARRAY: [],
                PRODUCT_CONTENT: '',
                PRODUCT_ID: '',
            },
            quantity: 1 // 新增 quantity 屬性並設置初始值為 1
        };
    },
    created() {
        const urlParams = new URLSearchParams(window.location.search);
        this.productId = urlParams.get('id');
        // console.log(this.productId);
        this.fetchProducts(); // 手动调用fetchProducts方法
    },
    methods: {
        fetchProducts() {
            $.ajax({
                url: 'http://localhost/THD101_NO1/php/shopping_list.php?id=' + this.productId,
                // url: '../php/shopping_list.php?id=' + this.productId,
                type: 'GET',
                dataType: 'json',
                data: {
                    id: this.productId // 将获取的ID值作为参数传递给PHP
                },
                success: response => {
                    // console.log(response);
                    const productData = response[0]; // 获取第一个对象
                    this.shoppingItems = {
                        PRODUCT_TITLE: productData.PRODUCT_TITLE,
                        PRODUCT_PRICE: productData.PRODUCT_PRICE,
                        INVENTORY: productData.INVENTORY,
                        IMG_SOURCE_ARRAY: productData.IMG_SOURCE ? productData.IMG_SOURCE.split(',') : [],
                        PRODUCT_CONTENT: productData.PRODUCT_CONTENT, // 添加PRODUCT_CONTENT属性
                        PRODUCT_ID:productData.PRODUCT_ID
                    };

                },
                error: (xhr, status, error) => {
                    console.error(error);
                }
            });
            
        },
        addToCart() {
            let purchaseq = parseInt($(".ITEMCOUNT_BTN-BODY").val());
    
            const item = {
                PRODUCT_ID: this.shoppingItems.PRODUCT_ID,
                PRODUCT_TITLE: this.shoppingItems.PRODUCT_TITLE,
                PRODUCT_PRICE: this.shoppingItems.PRODUCT_PRICE,
                INVENTORY: this.shoppingItems.INVENTORY,
                IMG_SOURCE_ARRAY: this.shoppingItems.IMG_SOURCE_ARRAY,
                PRODUCT_CONTENT: this.shoppingItems.PRODUCT_CONTENT,
                quantity: purchaseq
            };
    
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingItemIndex = cartItems.findIndex(cartItem => cartItem.PRODUCT_ID === item.PRODUCT_ID);
            let showAlert = true; // 用于跟踪是否已经弹出过警告信息

            if (existingItemIndex !== -1) {
                const existingItem = cartItems[existingItemIndex];
                const totalQuantity = existingItem.quantity + item.quantity;
                if (totalQuantity > item.INVENTORY) {
                existingItem.quantity = item.INVENTORY;
                alert('超過庫存數量，已將購買數量調整為庫存數量。');
                showAlert = false; // 不再弹出成功添加到购物车的提示
                } else {
                    existingItem.quantity = totalQuantity;
                }
            } else {
                cartItems.push(item);
            }
    
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            if (showAlert) {
                alert('商品已成功加入購物車');
            }
        }
    }

});

app.mount("#SHOPPINGLISTVUE");
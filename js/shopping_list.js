const app = Vue.createApp({
    data() {
        return {
            productId: null,
            shoppingItems: {
                PRODUCT_TITLE: '',
                PRODUCT_PRICE: '',
                INVENTORY: '',
                IMG_SOURCE_ARRAY: []
            }
        };
    },
    created() {
        const urlParams = new URLSearchParams(window.location.search);
        this.productId = urlParams.get('id');
        console.log(this.productId);
        this.fetchProducts(); // 手动调用fetchProducts方法
    },
    methods: {
        fetchProducts() {
            $.ajax({
                url: 'http://localhost/THD101_NO1/php/shopping_list.php?id=' + this.productId,
                type: 'GET',
                dataType: 'json',
                data: {
                    id: this.productId // 将获取的ID值作为参数传递给PHP
                },
                success: response => {
                    console.log(response);
                    const productData = response[0]; // 获取第一个对象
                    this.shoppingItems = {
                        PRODUCT_TITLE: productData.PRODUCT_TITLE,
                        PRODUCT_PRICE: productData.PRODUCT_PRICE,
                        INVENTORY: productData.INVENTORY,
                        IMG_SOURCE_ARRAY: productData.IMG_SOURCE ? productData.IMG_SOURCE.split(',') : []
                    };

                },
                error: (xhr, status, error) => {
                    console.error(error);
                }
            });
        }
    }

});

app.mount("#SHOPPINGLISTVUE");
const app = Vue.createApp({
    data() {
        return {
            shoppingItems: []
        };
    },
    mounted() {
        this.fetchProducts();
    },
    methods: {
        fetchProducts() {
            $.ajax({
                url: 'http://localhost/THD101_NO1/php/shopping.php',
                type: 'GET',
                dataType: 'json',
                success: response => {
                    console.log(response);
                    this.shoppingItems = response;
                },
                error: (xhr, status, error) => {
                    console.error(error);
                }
            });
        },
        getImagesArray(imgSrc) {
            return imgSrc.split(',');
        }
    }
});

app.mount("#SHOPPINGITEM_UL");
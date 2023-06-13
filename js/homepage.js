const app = Vue.createApp({
    data() {
        return {
            informationItems: [],
            // selectedCategory: '',
            // searchKeyword: '',
     
            // itemsPerPage: 12,
            // currentPage: 1,
            // quantity: 1
        };
    },
    mounted() {
        this.fetchInformation();
    },
    methods: {
        fetchInformation() {
            $.ajax({
                // url: '../php/homepage.php',
                url: 'http://localhost/THD101_project/php/homepage.php',
                type: 'GET',
                dataType: 'json',
                success: response => {
                    // console.log(response);
                    this.informationItems = response;
                    // this.filterItems();

                   
                },
                error: (xhr, status, error) => {
                    console.error(error);
                }
            });
        },
        getImagesArray(imgSrc) {
            return imgSrc.split(',');
        },
       
      
    },
  

});

app.mount("#app");

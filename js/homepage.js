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
        // filterItems() {
        //     if (this.selectedCategory === '' && this.searchKeyword === '') {
        //         this.displayedItems = this.shoppingItems;
        //     } else {
        //         this.displayedItems = this.shoppingItems.filter(item =>
        //             (this.selectedCategory === '' || item.PRODUCT_CATAGORY_ID.toString() === this.selectedCategory) &&
        //             (this.searchKeyword === '' || item.PRODUCT_TITLE.toLowerCase().includes(this.searchKeyword.toLowerCase()))
        //         );
        //     }
        //     this.paginateItems();
        // },
        // paginateItems() {
        //     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        //     const endIndex = startIndex + this.itemsPerPage;
        //     this.displayedItems = this.filteredItems.slice(startIndex, endIndex);
        // },
        // goToPage(page) {
        //     this.currentPage = page;
        //     this.paginateItems();
        //     this.scrollToTop();
        // },
        // goToPreviousPage() {
        //     if (this.currentPage > 1) {
        //         this.currentPage--;
        //         this.paginateItems();
        //         this.scrollToTop();
        //     }
        // },
        // goToNextPage() {
        //     if (this.currentPage < this.totalPages) {
        //         this.currentPage++;
        //         this.paginateItems();
        //         this.scrollToTop();
        //     }
        // },
            // scrollToTop() {
            //     this.$nextTick(() => {
            //         const itemList = this.$refs.itemList;
            //         if (itemList) {
            //             const offsetTop = itemList.offsetTop + 650; // 调整偏移量为更低的位置
            //             window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            //         }
            //     });
            // },
      
    },
    computed: {
        // filteredItems() {
        //     if (this.selectedCategory === '' && this.searchKeyword === '') {
        //         return this.shoppingItems;
        //     } else {
        //         return this.shoppingItems.filter(item =>
        //             (this.selectedCategory === '' || item.PRODUCT_CATAGORY_ID.toString() === this.selectedCategory) &&
        //             (this.searchKeyword === '' || item.PRODUCT_TITLE.toLowerCase().includes(this.searchKeyword.toLowerCase()))
        //         );
        //     }
        // },
        // totalPages() {
        //     return Math.ceil(this.filteredItems.length / this.itemsPerPage);
        // }
    },
    watch: {
        // filteredItems() {
        //     this.currentPage = 1;
        //     this.paginateItems();
        // }
    }
});

app.mount("#app");

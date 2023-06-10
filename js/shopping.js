const app = Vue.createApp({
    data() {
        return {
            shoppingItems: [],
            selectedCategory: '',
            searchKeyword: '',
            displayedItems: [],
            itemsPerPage: 12,
            currentPage: 1,
            quantity: 1
        };
    },
    mounted() {
        this.fetchProducts();
    },
    methods: {
        fetchProducts() {
            $.ajax({
                // url: 'http://tibamef2e.com/thd101/g1/php/shopping.php',
                url: 'http://localhost/THD101_NO1/php/shopping.php',
                // url: '../php/shopping.php',
                type: 'GET',
                dataType: 'json',
                success: response => {
                    // console.log(response);
                    this.shoppingItems = response;
                    this.filterItems();
                },
                error: (xhr, status, error) => {
                    console.error(error);
                }
            });
        },
        getImagesArray(imgSrc) {
            return imgSrc.split(',');
        },
        filterItems() {
            if (this.selectedCategory === '' && this.searchKeyword === '') {
                this.displayedItems = this.shoppingItems;
            } else {
                this.displayedItems = this.shoppingItems.filter(item =>
                    (this.selectedCategory === '' || item.PRODUCT_CATAGORY_ID.toString() === this.selectedCategory) &&
                    (this.searchKeyword === '' || item.PRODUCT_TITLE.toLowerCase().includes(this.searchKeyword.toLowerCase()))
                );
            }
            this.paginateItems();
        },
        paginateItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            this.displayedItems = this.filteredItems.slice(startIndex, endIndex);
        },
        goToPage(page) {
            this.currentPage = page;
            this.paginateItems();
            this.scrollToTop();
        },
        goToPreviousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.paginateItems();
                this.scrollToTop();
            }
        },
        goToNextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.paginateItems();
                this.scrollToTop();
            }
        },
        scrollToTop() {
            this.$nextTick(() => {
                const itemList = this.$refs.itemList;
                if (itemList) {
                    const offsetTop = itemList.offsetTop + 650; // 调整偏移量为更低的位置
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            });
        },
        addToCart(item) {
            const purchaseq = parseInt($(".ITEMCOUNT_BTN-BODY").val());
        
            const newItem = {
                PRODUCT_ID: item.PRODUCT_ID,
                PRODUCT_TITLE: item.PRODUCT_TITLE,
                PRODUCT_PRICE: item.PRODUCT_PRICE,
                INVENTORY: item.INVENTORY,
                IMG_SOURCE_ARRAY: this.getImagesArray(item.IMG_SOURCE),
                PRODUCT_CONTENT: item.PRODUCT_CONTENT,
                quantity: this.quantity
            };
        
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingItemIndex = cartItems.findIndex(cartItem => cartItem.PRODUCT_ID === item.PRODUCT_ID);
            let showAlert = true; // 用于跟踪是否已经弹出过警告信息
        
            if (existingItemIndex !== -1) {
                const existingItem = cartItems[existingItemIndex];
                const totalQuantity = existingItem.quantity + newItem.quantity;
                if (totalQuantity > newItem.INVENTORY) {
                    existingItem.quantity = newItem.INVENTORY;
                    alert('超過庫存數量，已將購買數量調整為庫存數量。');
                    showAlert = false; // 不再弹出成功添加到购物车的提示
                } else {
                    existingItem.quantity = totalQuantity;
                }
            } else {
                cartItems.push(newItem);
            }
        
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
            if (showAlert) {
                alert('商品已成功加入購物車');
            }
        }
    },
    computed: {
        filteredItems() {
            if (this.selectedCategory === '' && this.searchKeyword === '') {
                return this.shoppingItems;
            } else {
                return this.shoppingItems.filter(item =>
                    (this.selectedCategory === '' || item.PRODUCT_CATAGORY_ID.toString() === this.selectedCategory) &&
                    (this.searchKeyword === '' || item.PRODUCT_TITLE.toLowerCase().includes(this.searchKeyword.toLowerCase()))
                );
            }
        },
        totalPages() {
            return Math.ceil(this.filteredItems.length / this.itemsPerPage);
        }
    },
    watch: {
        filteredItems() {
            this.currentPage = 1;
            this.paginateItems();
        }
    }
});

app.mount("#SHOPPINGVUE");

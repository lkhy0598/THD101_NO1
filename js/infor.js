$(document).ready(function () {
    $('.INFORMATION_NAVS li:first-child').addClass('INFORTAB_ACTIVE');
    $('.INFORMATION_BOX ul:first-child').addClass('INFORACTIVE');
    $('.INFORMATION_NAV_BG').css({
        'left': '0%',
        'transform': 'translateX(0%)'
    });


    $('.INFORMATION_NAVS li').click(function (e) {
        e.preventDefault();
        var tab_id = $(this).find('a').attr('href');

        $('.INFORMATION_NAVS li').removeClass('INFORTAB_ACTIVE');
        $('.INFORMATION_BOX ul').removeClass('INFORACTIVE');

        $(this).addClass('INFORTAB_ACTIVE');
        $(tab_id).addClass('INFORACTIVE');
    });
    // 標籤底色
    $('.TABL').click(function (e) {
        // e.preventDefault();
        $('.INFORMATION_NAV_BG').css({
            'left': '0%',
            'transform': 'translateX(0%)'
        });
    });
    $('.TABC').click(function (e) {
        // e.preventDefault();
        $('.INFORMATION_NAV_BG').css({
            'left': '50%',
            'transform': 'translateX(-50%)'
        });
    });
    $('.TABR').click(function (e) {
        // e.preventDefault();
        $('.INFORMATION_NAV_BG').css({
            'left': '100%',
            'transform': 'translateX(-100%)'
        });
    });
    // 主標後面動畫
    $(window).on('scroll', function () {
        var scrollPosition = $(window).scrollTop();
        var initialLeft = 300; // 初始 left 值
        var maxLeft = 1500; // 停止的 left 值
        var MinitialLeft = 0; // 初始 left 值
        var MmaxLeft = 240; // 停止的 left 值

        var newLeft = initialLeft + scrollPosition;
        var MnewLeft = MinitialLeft + scrollPosition;
        if (newLeft <= maxLeft) {
            $('.DOG_ANI1').css('left', newLeft + 'px');
        }
        if (MnewLeft <= MmaxLeft) {
            $('.DOG_ANI2').css('left', MnewLeft + 'px');
        }
    });
});




const app = Vue.createApp({
    data() {
        return {
            informationItems: [],
            selectedCategory: '',
            searchKeyword: '',
            inforItems: [],
     
            itemsPerPage: 12,
            currentPage: 1,
            quantity: 1
        };
    },
    mounted() {
        this.fetchInformation();
    },
    methods: {
        fetchInformation() {
            $.ajax({
                url: '../php/information.php',
                // url: 'http://localhost/THD101_project/php/information.php',
                type: 'GET',
                dataType: 'json',
                success: response => {
                    // console.log(response);
                    this.informationItems = response;
                    // this.filterItems();
                    this.paginateItems(); // 添加此行代码


                   
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
                this.inforItems = this.informationItems;
            } else {
                this.inforItems = this.informationItems.filter(item =>
                    (this.selectedCategory === '' || infor.NEWS_ID.toString() === this.selectedCategory) &&
                    (this.searchKeyword === '' || infor.TITLE.toLowerCase().includes(this.searchKeyword.toLowerCase()))
                );
            }
            this.paginateItems();
        },
        paginateItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            this.inforItems = this.filteredItems.slice(startIndex, endIndex);
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
      
    },
    computed: {
        filteredItems() {
            if (this.selectedCategory === '' && this.searchKeyword === '') {
                return this.informationItems;
            } else {
                return this.informationItems.filter(infor =>
                    (this.selectedCategory === '' || infor.NEWS_ID.toString() === this.selectedCategory) &&
                    (this.searchKeyword === '' || infor.TITLE.toLowerCase().includes(this.searchKeyword.toLowerCase()))
                );
            }
        },
        totalPages() {
            return Math.ceil(this.filteredItems.length / this.itemsPerPage);
        },
        filteredNewsItems() {
            return this.informationItems.filter((infor) => infor.INFOR_TYPE === '最新消息');
          },
          filteredHealthItems() {
            return this.informationItems.filter((infor) => infor.INFOR_TYPE === '衛教資訊');
          },
          filteredLinkItems() {
            return this.informationItems.filter((infor) => infor.INFOR_TYPE === '相關連結');
          },
    },
    watch: {
        filteredItems() {
            this.currentPage = 1;
            this.paginateItems();
        }
    }
});

app.mount("#BACKGROUND");


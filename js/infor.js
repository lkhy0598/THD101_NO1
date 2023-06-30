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




// const app = Vue.createApp({
//     data() {
//         return {
//             // informationItems: [],
//             // selectedCategory: '',
//             // searchKeyword: '',
//             // inforItems: [],
     
//             // itemsPerPage: 1,
//             // currentPage: 1,
//             // quantity: 1

//             
//         };
//     },
//     mounted() {
//         this.fetchInformation();
//     },
//     methods: {
//         fetchInformation() {
//             $.ajax({
//                 // url: '../php/information.php',
//                 url: 'http://localhost/THD101_project/php/information.php',
//                 type: 'GET',
//                 dataType: 'json',
//                 success: response => {
//                     // console.log(response);
//                     this.informationItems = response;
//                     // this.filterItems();
//                     this.paginateItems(); // 添加此行代码


                   
//                 },
//                 error: (xhr, status, error) => {
//                     console.error(error);
//                 }
//             });
//         },
//         getImagesArray(imgSrc) {
//             return imgSrc.split(',');
//         },
//         filterItems() {
//             if (this.selectedCategory === '' && this.searchKeyword === '') {
//                 this.inforItems = this.informationItems;
//             } else {
//                 this.inforItems = this.informationItems.filter(item =>
//                     (this.selectedCategory === '' || infor.NEWS_ID.toString() === this.selectedCategory) &&
//                     (this.searchKeyword === '' || infor.TITLE.toLowerCase().includes(this.searchKeyword.toLowerCase()))
//                 );
//             }
//             this.paginateItems();
//         },
//         paginateItems() {
//             const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//             const endIndex = startIndex + this.itemsPerPage;
//             this.inforItems = this.filteredNewsItems.slice(startIndex, endIndex);
//             this.inforItems = this.filteredHealthItems.slice(startIndex, endIndex);
//             this.inforItems = this.filteredLinkItems.slice(startIndex, endIndex);
//         },
//         goToPage(page) {
//             this.currentPage = page;
//             this.paginateItems();
//             this.scrollToTop();
//         },
//         goToPreviousPage() {
//             if (this.currentPage > 1) {
//                 this.currentPage--;
//                 this.paginateItems();
//                 this.scrollToTop();
//             }
//         },
//         goToNextPage() {
//             if (this.currentPage < this.totalPages) {
//                 this.currentPage++;
//                 this.paginateItems();
//                 this.scrollToTop();
//             }
//         },
//         scrollToTop() {
//             this.$nextTick(() => {
//                 const itemList = this.$refs.itemList;
//                 if (itemList) {
//                     const offsetTop = itemList.offsetTop + 650; // 调整偏移量为更低的位置
//                     window.scrollTo({ top: offsetTop, behavior: 'smooth' });
//                 }
//             });
//         },
      
//     },
//     computed: {
//         filteredItems() {
//             if (this.selectedCategory === '' && this.searchKeyword === '') {
//                 return this.informationItems;
//             } else {
//                 return this.informationItems.filter(infor =>
//                     (this.selectedCategory === '' || infor.NEWS_ID.toString() === this.selectedCategory) &&
//                     (this.searchKeyword === '' || infor.TITLE.toLowerCase().includes(this.searchKeyword.toLowerCase()))
//                 );
//             }
//         },
//         totalPages1() {
//             return Math.ceil(this.filteredNewsItems.length / this.itemsPerPage);
//         }
//         ,totalPages2() {
//             return Math.ceil(this.filteredHealthItems.length / this.itemsPerPage);
//         }
//         ,totalPages3() {
//             return Math.ceil(this.filteredLinkItems.length / this.itemsPerPage);
//         },
//         filteredNewsItems() {
//             return this.informationItems.filter((infor) => infor.INFOR_TYPE === '最新消息');
//           },
//           filteredHealthItems() {
//             return this.informationItems.filter((infor) => infor.INFOR_TYPE === '衛教資訊');
//           },
//           filteredLinkItems() {
//             return this.informationItems.filter((infor) => infor.INFOR_TYPE === '相關連結');
//           },

          
//     },
//     watch: {
//         filteredItems() {
//             this.currentPage = 1;
//             this.paginateItems();
//         }
//     }
// });

// app.mount("#BACKGROUND");


const app = Vue.createApp({
    data() {
      return {
        informationItems: [],
        selectedCategory: '',
        searchKeyword: '',
        itemsPerPage1: 4, // 每页显示的项目数量（最新消息）
        itemsPerPage2: 4, // 每页显示的项目数量（衛教資訊）
        itemsPerPage3: 4, // 每页显示的项目数量（相關連結）
        currentPage1: 1, // 当前页码（最新消息）
        currentPage2: 1, // 当前页码（衛教資訊）
        currentPage3: 1, // 当前页码（相關連結）
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
          success: (response) => {
            this.informationItems = response;
            this.paginateItems();
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
        // 省略过滤逻辑
        this.paginateItems();
      },
      paginateItems() {
        const startIndex1 = (this.currentPage1 - 1) * this.itemsPerPage1;
        const endIndex1 = startIndex1 + this.itemsPerPage1;
        const startIndex2 = (this.currentPage2 - 1) * this.itemsPerPage2;
        const endIndex2 = startIndex2 + this.itemsPerPage2;
        const startIndex3 = (this.currentPage3 - 1) * this.itemsPerPage3;
        const endIndex3 = startIndex3 + this.itemsPerPage3;
  
        this.filteredNewsItems = this.informationItems
          .filter((infor) => infor.INFOR_TYPE === '最新消息')
          .slice(startIndex1, endIndex1);
        this.filteredHealthItems = this.informationItems
          .filter((infor) => infor.INFOR_TYPE === '衛教資訊')
          .slice(startIndex2, endIndex2);
        this.filteredLinkItems = this.informationItems
          .filter((infor) => infor.INFOR_TYPE === '相關連結')
          .slice(startIndex3, endIndex3);
      },
      goToPage1(page) {
        this.currentPage1 = page;
        this.paginateItems();
        this.scrollToTop();
      },
      goToPage2(page) {
        this.currentPage2 = page;
        this.paginateItems();
        this.scrollToTop();
      },
      goToPage3(page) {
        this.currentPage3 = page;
        this.paginateItems();
        this.scrollToTop();
      },
      goToPreviousPage1() {
        if (this.currentPage1 > 1) {
          this.currentPage1--;
          this.paginateItems();
          this.scrollToTop();
        }
      },
      goToPreviousPage2() {
        if (this.currentPage2 > 1) {
          this.currentPage2--;
          this.paginateItems();
          this.scrollToTop();
        }
      },
      goToPreviousPage3() {
        if (this.currentPage3 > 1) {
          this.currentPage3--;
          this.paginateItems();
          this.scrollToTop();
        }
        },
        goToNextPage1() {
        const totalPages1 = Math.ceil(this.filteredNewsItems.length / this.itemsPerPage1);
        if (this.currentPage1 < totalPages1) {
        this.currentPage1++;
        this.paginateItems();
        this.scrollToTop();
        }
        },
        goToNextPage2() {
        const totalPages2 = Math.ceil(this.filteredHealthItems.length / this.itemsPerPage2);
        if (this.currentPage2 < totalPages2) {
        this.currentPage2++;
        this.paginateItems();
        this.scrollToTop();
        }
        },
        goToNextPage3() {
        const totalPages3 = Math.ceil(this.filteredLinkItems.length / this.itemsPerPage3);
        if (this.currentPage3 < totalPages3) {
        this.currentPage3++;
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
        filteredNewsItems() {
        return this.informationItems.filter((infor) => infor.INFOR_TYPE === '最新消息');
        },
        displayedNewsItems() {
            const startIndex = (this.currentPage1 - 1) * this.itemsPerPage1;
            const endIndex = startIndex + this.itemsPerPage1;
            return this.filteredNewsItems.slice(startIndex, endIndex);
          },
        
        filteredHealthItems() {
        return this.informationItems.filter((infor) => infor.INFOR_TYPE === '衛教資訊');
        },

        displayedHealthItems() {
            const startIndex = (this.currentPage2 - 1) * this.itemsPerPage2;
            const endIndex = startIndex + this.itemsPerPage2;
            return this.filteredHealthItems.slice(startIndex, endIndex);
        },
        filteredLinkItems() {
        return this.informationItems.filter((infor) => infor.INFOR_TYPE === '相關連結');
        },

        displayedLinkItems() {
            const startIndex = (this.currentPage3 - 1) * this.itemsPerPage3;
            const endIndex = startIndex + this.itemsPerPage3;
            return this.filteredLinkItems.slice(startIndex, endIndex);
        },
        totalPages1() {
        return Math.ceil(this.filteredNewsItems.length / this.itemsPerPage1);
        },
        totalPages2() {
        return Math.ceil(this.filteredHealthItems.length / this.itemsPerPage2);
        },
        totalPages3() {
        return Math.ceil(this.filteredLinkItems.length / this.itemsPerPage3);
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
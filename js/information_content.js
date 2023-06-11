const app = Vue.createApp({
    data() {
        return {
         
            NEWS_ID:null,
            NewsItems: {
                DATE:'',
                TITLE: '',
                IMG_SOURCE_ARRAY: [],
                CONTENT: '',
                NEWS_ID: '',
            },
        };
    },
    created() {
        this.fetchInformation();
    },
    methods: {
        fetchInformation() {
            $.ajax({
                // url: '../php/homepage.php',
                url: 'http://localhost/THD101_project/php/information.php?id=' + this.NEWS_ID,
                type: 'GET',
                dataType: 'json',
                data: {
                    id: this.NEWS_ID // 将获取的ID值作为参数传递给PHP
                },
                success: response => {
                    // console.log(response);
                    const newsData = response[0]; // 获取第一个对象
                    // console.log(newsData)
                    this.NewsItems = {

                        DATE: newsData.DATE,
                        TITLE: newsData.TITLE,
                        IMG_SOURCE_ARRAY: newsData.IMG_SOURCE ? newsData.IMG_SOURCE.split(',') : [],
                        CONTENT: newsData.CONTENT,
                        NEWS_ID: newsData.NEWS_ID,
                    };

                   
                },
                error: (xhr, status, error) => {
                    console.error(error);
                }
            });
        },
       
    }
  
});

app.mount("#INFOMATION_CONTENT_BOX");

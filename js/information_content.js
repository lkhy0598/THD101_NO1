

const app = Vue.createApp({
    data() {
        return {
         
            NEWS_ID: null,
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
        const urlParams = new URLSearchParams(window.location.search);
        this.NEWS_ID = urlParams.get('id');
        this.fetchInformation();
        // console.log(this.NEWS_ID);
    },
    
    methods: {
        stripHTML(html) {
            const doc = new DOMParser().parseFromString(html, "text/html");
            const paragraphs = doc.body.querySelectorAll("p");

            let textContent = "";
            paragraphs.forEach((p, index) => {
                const paragraphText = p.textContent.trim();
                textContent += paragraphText;

                // 在每个段落之后添加换行符号，除了最后一个段落
                if (index < paragraphs.length - 1) {
                textContent += "\n\n";
                }
            });

            return textContent;
        },
        

        fetchInformation() {
            $.ajax({
                url: '../php/information_content.php?id=' + this.NEWS_ID,
                // url: 'http://localhost/THD101_project/php/information_content.php?id=' + this.NEWS_ID,
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
                        CONTENT: this.stripHTML(newsData.CONTENT),
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



app.mount("#test");


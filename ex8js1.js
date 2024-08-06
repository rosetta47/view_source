(function(){
const {createApp} = Vue;

createApp({
    data(){
        return{
            key:'값1',
            key2:'값2',
            message:'안녕하세요',
            htmlString:'<p style="color:blue;">맑게 갠 파란하늘</p>',
            su1:'0',
            su2:'0',
            txtMsg:'',
            daumlogo:'https://t1.daumcdn.net/daumtop_deco/images/pctop/2023/logo_daum.png',
        }
    },
    methods: {
        myFunc(){
            console.log(this.message);
        },
        myChange1(){
            this.message = "안녕";
        },
        myChange2(){
            this.message = "반가워";
        },
    },

}).mount('#app')
})();



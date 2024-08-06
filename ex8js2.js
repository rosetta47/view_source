(function(){
const {createApp} = Vue;

createApp({
    data(){
        return{
            ypay:0,
            busers:[
                {bunho:'10', irum:'총무부', junhwa:'111-1111'},
                {bunho:'20', irum:'영업부', junhwa:'111-1344'},
                {bunho:'30', irum:'전산부', junhwa:'111-1123'},
                {bunho:'40', irum:'관리부', junhwa:'123-1111'},
            ],
            cssStyleTest:{
                color:'red', fontSize:'20px'
            }
        
        }
    },

}).mount('#app2')

})();



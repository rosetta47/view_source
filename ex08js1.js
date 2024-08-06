const {createApp} = Vue;

createApp({
    data() {
        return {
            name:'',
            java:0,
            react:0,
            vue:0,
            count:0,
            student : [], 
            num: 0,
            final:0
        }
    },
    methods: {
        onClick(){
            this.count++;
            this.num = this.java + this.react + this.vue;
            this.student.push({name:this.name, java:this.java, react:this.react, vue:this.vue, num:this.num})
            this.final = this.num + this.final;
            this.name = '';
            this.java = 0;
            this.react = 0;
            this.vue = 0;
        }
    },
}).mount('#app');
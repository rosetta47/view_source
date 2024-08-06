(function () {
  const { createApp } = Vue;

  createApp({
    data() {
      return {
        irum: "홍길동",
        java: "45",
        react: "55",
        vue: "85",

        jumsu: [],
      };
    },
    methods: {
      myFunc() {
        // 확인버튼 (성적 관리)
        this.jumsu.push({
          irum: this.irum,
          java: this.java,
          react: this.react,
          vue: this.vue,
        });
    },
    computed:{ // 총합
        sum(){
            return this.java + this.react + this.vue;
           
        }
      }
    },
  }).mount("#app");
})();

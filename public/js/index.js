new Vue({
  el: '#app',
  components: {
    "login-page": loginPage
  },
  data(){
    return {
      showLogin: true
    }
  },
  mounted () {
    this.$on('switchPage', () => {

    })
  }
})
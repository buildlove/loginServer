
let content = `
<div class="content">
  <div class="modal-content">
    <div class="modal-body">
      <ul class="nav nav-tabs">
        <li :class="{'li-active': !reg}" @click="loginPage()">
          <a href="#signin-form">登陆</a>
        </li>
        <li @click="registerPage()" :class="{'li-active': reg}">
          <a href="#signin-form">注册</a>
        </li>
      </ul>
      <div class="tab-contant">
        <div class="tab-pane" v-if="!reg">
          <form>
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon">
                  <i class="iconfont icon-youxiang i-p"></i>
                </div>
                <input type="email" v-model="formLabelAlign.username" class="form-control" placeholder="请输入邮箱">
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon">
                  <i class="iconfont icon-mima i-p"></i>
                </div>
                <input type="email" v-model="formLabelAlign.password" class="form-control" placeholder="请输入密码">
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon" @click="getVerifyCode">
                  <img :src="verifyCodeSvg" style="width: 100%; height: 100%">
                </div>
                <input type="email" v-model="formLabelAlign.verifyCode" class="form-control" placeholder="请输入验证码">
              </div>
            </div>
            <div class="form-group">
              <input class="btn-login-page" name="submit" type="button" value="登陆" @click="login()">
            </div>
            <div class="form-group remember-login">
              <!-- <input name="remember" type="checkbox" value="y">
              <span class="next-login">下次自动登录</span>
              <a class="pull-right" href="/reset_password">忘记密码？</a> -->
            </div>
            <div class="form-group"></div>
            <div class="form-group"></div>
          </form>
        </div>
        <div class="tab-pane" v-else>
          <form>
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon">
                  <i class="iconfont icon-youxiang i-p"></i>
                </div>
                <input type="email" v-model="formLabelAlign.username" class="form-control" placeholder="请输入邮箱">
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon">
                  <i class="iconfont icon-mima i-p"></i>
                </div>
                <input type="password" v-model="formLabelAlign.password" class="form-control" placeholder="请输入密码">
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon">
                  <i class="iconfont icon-mima i-p"></i>
                </div>
                <input type="password" v-model="formLabelAlign.repassword" class="form-control" placeholder="请重复输入密码">
              </div>
            </div>
            <div class="form-group">
              <input class="btn-login-page" name="submit" type="button" value="注册" @click="register()">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
`
let loginPage = {
  template: content,
  data() {
    return {
        usermsg: null,
        labelPosition: 'right',
        reg: false,
        publicKey: '',
        verifyCodeSvg: '',
        formLabelAlign: {
          username: '',
          password: '',
          repassword: '',
          verifyCode: ''
        }
      }
  },
  methods: {
      // 缓存没有过期的情况下直接跳转到主页
      checkCache () {
        // @ts-ignore
        loginOut()
        let u = localStorage.getItem('u')
        if (u) {
          location.href = location.origin + '/myzoom'
        }
      },
      checkoutInput(){
        let error = ''
        if(!this.formLabelAlign.verifyCode) error = '请输入验证码'
        if(!this.formLabelAlign.password || !this.formLabelAlign.username) error = '请输入账号密码'
        if(error){
          // @ts-ignore
          ELEMENT.Message({
            type: 'error',
            message: error
          })
        }
        return !error
      },
      // 登陆
      login () {
        if(!this.checkoutInput()){return}
        const params = new URLSearchParams();
        let password = this.formLabelAlign.password
        let encrypted = CryptoJS.AES.encrypt(password, this.publicKey).toString();
        params.append('username', this.formLabelAlign.username);
        params.append('password', encrypted);
        params.append('verifyCode', this.formLabelAlign.verifyCode);
        // @ts-ignore
        axios.post('/login', params).then((res)=> {
          if(res.data && res.data.code){
            // @ts-ignore
            ELEMENT.Message.success(res.data.message)
            sessionStorage.setItem('userId', res.data.data.userId)
            // 跳转链接

          } else {
            // @ts-ignore
            ELEMENT.Message({
              type: 'error',
              message: res.data.message
            })
          }
        });
      },
      getVerifyCode () {
        const self = this
        // @ts-ignore
        axios.get('/login/sendVerifyCode', { headers: {publickey: this.publicKey} }).then((res)=> {
          self.verifyCodeSvg = res.data.data.img
        });
      },
      checkoutInput1(){
        let error = ''
        if(this.formLabelAlign.password !== this.formLabelAlign.repassword) error = '密码不一致, 请重新输入'
        if(!this.formLabelAlign.password || !this.formLabelAlign.username) error = '请输入账号密码'
        if(error){
          // @ts-ignore
          ELEMENT.Message({
            type: 'error',
            message: error
          })
        }
        return !error
      },
      register () {
        let self = this
        if(!this.checkoutInput1()){return}
        const params = new URLSearchParams();
        let password = this.formLabelAlign.password
        let encrypted = CryptoJS.AES.encrypt(password, this.publicKey).toString();
        params.append('username', this.formLabelAlign.username);
        params.append('password', encrypted);
        // @ts-ignore
        axios.post('/register', params, { headers: {publickey: this.publicKey} }).then((res)=> {
          if(res.data && res.data.code){
            // @ts-ignore
            ELEMENT.Message({
              type: 'success',
              message: res.data.message,
              duration: 0
            })
            self.reg = false
          } else {
            // @ts-ignore
            ELEMENT.Message({
              type: 'error',
              message: res.data.message
            })
          }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      loginPage () {
        this.reg = false
      },
      registerPage () {
        this.reg = true
      },
    },
  mounted () {
    let self = this

    // @ts-ignore
    axios.get('/login/getPublicKey').then((res)=> {
      self.publicKey = res.data.data.publicKey
      self.getVerifyCode()
    });

    document.onkeydown = function (e) {
      var keyNum = window.event ? e.keyCode : e.which
      if (keyNum === 13) {
        self.login()
      }
    }
  }
}



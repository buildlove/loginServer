
let content = `
<div class="content">
  <div class="modal-content">
    <div class="modal-body">
      <ul class="nav nav-tabs">
        <li :class="{'li-active': !reg}">
          <a href="#signin-form">忘记密码</a>
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
                <input type="email" v-model="formLabelAlign.password" class="form-control" placeholder="请输入邮件激活码">
              </div>
            </div>
          </form>
        </div>
        <div class="tab-pane" v-else>
          <form>
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon">
                  <i class="iconfont icon-mima i-p"></i>
                </div>
                <input type="password" v-model="formLabelAlign.password" class="form-control" placeholder="请输入新密码">
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon">
                  <i class="iconfont icon-mima i-p"></i>
                </div>
                <input type="password" v-model="formLabelAlign.repassword" class="form-control" placeholder="请重复输入新密码">
              </div>
            </div>
            <div class="form-group">
              <input class="btn-login-page" name="submit" type="button" value="修改密码" @click="register()">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
`
let registerPage = {
  template: content,
  props: [''],
  data() {
    return {
      ActivationEmail: {
        name: '激活邮件'
      },
      ForgetPassword: {
        name: '忘记密码'
      },
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

  }
}



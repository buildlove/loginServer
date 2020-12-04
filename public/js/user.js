// @ts-nocheck
let userTable = {
  template: `
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  `,
  props: [''],
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {

  },
  mounted(){
    const params = new URLSearchParams();
    params.append('username', this.formLabelAlign.username);
    // @ts-ignore
    axios.post('/user', params).then((res)=> {
      if(res.data && res.data.code){
        // @ts-ignore
        Element.Message.success(res.data.message)
        sessionStorage.setItem('userId', res.data.data.userId)
        // 跳转链接

      } else {
        // @ts-ignore
        Element.Message({
          type: 'error',
          message: res.data.message
        })
      }
    });
  }
}

new Vue({
  el: '#user',
  components: {
    "user-table": userTable
  },
  data(){
    return {
    }
  },
  mounted () {

  }
})
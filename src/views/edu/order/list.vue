
<template>
  <div class="app-container">
   
    <el-form :inline="true" class="demo-form-inline">
      <!-- <el-form-item>
        <el-input  />
      </el-form-item> -->
      <el-form-item>
        <el-input v-model="orderQuery.orderNo" placeholder="订单号"/>
      </el-form-item>
         <el-form-item>
        <el-input v-model="orderQuery.nickname" placeholder="用户昵称"/>
      </el-form-item>

     
        <el-form-item label="添加时间">
        <el-date-picker
          v-model="orderQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="orderQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

    
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>

      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

   
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="orderNo" label="订单号"/>
      <el-table-column prop="nickname" label="用户昵称"  width="100"/>
      <el-table-column prop="courseTitle" label="课程名"  width="100" />
      <el-table-column prop="teacherName" label="讲师名"   width="100"/>
      <el-table-column prop="mobile" label="电话"  width="100" />
      <el-table-column prop="totalFee" label="订单金额"  width="100" /> 
      <el-table-column label="支付方式"  width="100">
        <template slot-scope="scope"  width="100">
          {{ scope.row.payType===1?'微信支付':'支付宝支付' }}
        </template>
      </el-table-column>
      <el-table-column label="订单状态" width="100">
        <template slot-scope="scope">
          {{ scope.row.status===1?'已支付':'未支付' }}
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreate" label="支付时间" width="160"/>

   </el-table>

   
  
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>
<script>
//引入调用js文件
import order from '@/api/edu/order'

export default {
 
    data() { //定义变量和初始值
        return {
          list:null,//查询之后接口返回集合
          page:1,//当前页
          limit:10,//每页记录数
          total:0,//总记录数
          orderQuery:{}
        }
    },
    created() { //页面渲染之前执行，一般调用methods定义的方法
        //调用
        this.getList() 
    },
    methods:{  //创建具体的方法，调用js定义的方法
       
            getList(page=1) {
            this.page = page
            order.pageOrderCondition(this.page,this.limit,this.orderQuery)
                .then(response =>{//请求成功
                    //response接口返回的数据
                    //console.log(response)
                    this.list = response.data.rows
                    this.total = response.data.total
                    console.log(this.list)   
                    console.log(this.orderQuery)
                }) 
        },
        resetData() {//清空的方法
            //表单输入项数据清空
            this.orderQuery = {}
            //查询所有讲师数据
            this.getList()
        },
    }
}
</script>

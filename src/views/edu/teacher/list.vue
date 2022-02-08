<template>
  <div>
    <el-form :inline="true" :model="teacherQuery">
      <el-form-item label="名称">
        <el-input v-model="teacherQuery.name" placeholder="coderpwh"></el-input>
      </el-form-item>
      <el-form-item label="级别">
        <el-select v-model="teacherQuery.level">
          <el-option label="高级讲师" value="1"></el-option>
          <el-option label="首席讲师" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker type="date" placeholder="选择日期" v-model="teacherQuery.gmtCreate"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker type="date" placeholder="选择日期" v-model="teacherQuery.gmtModified"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="resetData()">清空</el-button>
      </el-form-item>
    </el-form>
  <el-table
    v-loadding="listLoading"
    :data="teacherList"
    element-loading-text="数据加载中"
    border
    fit
    highlight-current-row
    style="width: 100%">
    <el-table-column
    label="序号"
    width="70"
    align="center"
    >
      <template slot-scope="scope">
        {{ (page - 1)*limit +scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="intro"
      label="简介">
    </el-table-column>
    <el-table-column
      prop="career"
      label="职位">
    </el-table-column>
    <el-table-column
      label="头衔">
      <template slot-scope="scope">
        {{ scope.row.level === 1 ? '高级讲师':'首席讲师' }}
      </template>
    </el-table-column>
    <el-table-column prop="gmtCreate" label="添加时间" width="160" />
    <el-table-column prop="sort" label="排序" width="60" />
    <el-table-column label="操作" width="200" align="center">
      <template slot-scope="scope">
        <router-link :to='"test"+scope.row.id'>
          <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
        </router-link>
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeTById(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      :page-size="limit"
      :pager-count="5"
      :background="true"
      :current-page="page"
      layout="prev, pager, next,total,jumper"
      @current-change="getList"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>

<script>
import Teacher from '@/api/teacher'
export default {
  name: 'List',
  data() {
    return {
      teacherList: [],
      listLoading: false,
      page: 1,
      limit: 2,
      total: 0,
      teacherQuery: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      Teacher.getTeacherListPage(this.page, this.limit, this.teacherQuery).then(
        resp => {
          const data = resp.data
          this.teacherList = data.rows
          this.total = data.total
          console.log(this.teacherList)
          console.log(this.total)
          this.listLoading = false
        }
      )
    },
    getList(page = 1) {
      this.listLoading = true
      this.page = page
      Teacher.getTeacherListPage(this.page, this.limit, this.teacherQuery).then(
        resp => {
          const data = resp.data
          this.teacherList = data.rows
          this.total = data.total
          console.log(this.teacherList)
          console.log(this.total)
          this.listLoading = false
        }
      )
    },
    resetData() {
      this.teacherQuery = {}
      this.getList()
    },
    removeTById(id) {
      this.$confirm('确认删除该讲师吗', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Teacher.delTeacherById(id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }).catch((e) => {
          this.$message({
            type: 'error',
            message: e
          })
        })
        this.getList(this.page)

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '删除已经取消'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>

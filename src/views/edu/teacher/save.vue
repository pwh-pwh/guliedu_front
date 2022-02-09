<template>
  <div id="edu-teacher-save">
    <el-form :model="teacher" label-width="80px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"></el-input>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro"></el-input>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"></el-input>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level">
          <el-option label="高级讲师" value="1"></el-option>
          <el-option label="首席讲师" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateOrsave()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import TeacherApi from '@/api/teacher'
export default {
  name: 'Save',
  created() {
    console.log('create.. ..create')
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getInfo(id)
    } else {
      // this.teacher = {}
    }
  },
  data() {
    return {
      teacher: {}
    }
  },
  methods: {
    saveTeacher() {
      TeacherApi.addTeacher(this.teacher).then(() => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.$router.push('/edu-teacher/table')
      })
    },
    getInfo(id) {
      TeacherApi.getTeacherInfoById(id).then(response => {
        this.teacher = response.data.item
      })
    },
    updateTeacher() {
      TeacherApi.updateTeacherInfoById(this.teacher).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.$router.push('/edu-teacher/table')
      })
    },
    updateOrsave() {
      if (this.teacher.id) {
        this.updateTeacher()
      } else {
        this.saveTeacher()
      }
    }
  }
}
</script>

<style scoped>

</style>

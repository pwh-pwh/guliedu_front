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
        <el-button type="primary" @click="saveTeacher()">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import TeacherApi from '@/api/teacher'
export default {
  name: 'Save',
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
    }
  }
}
</script>

<style scoped>

</style>

<template>
<div id="publish">
  <h3 style="text-align: center">发布新课程</h3>
  <el-steps :active="active" finish-status="wait" align-center style="margin-bottom: 40px;">
    <el-step title="填写课程基本信息"></el-step>
    <el-step title="创建课程大纲"></el-step>
    <el-step title="提交审核"></el-step>
  </el-steps>
  <el-form label-width="120px">
    <el-form-item>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="previous">返回修改</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">发布课程</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: 'Publish',
  data() {
    return {
      active: 2,
      saveBtnDisabled: false
    }
  },
  methods: {
    next() {

    },
    previous() {
      this.$router.push('/edu-course/chapter/1')
    }
  }
}
</script>

<style scoped>

</style>

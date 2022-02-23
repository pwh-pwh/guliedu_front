<template>
  <div id="save">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag>excel模板说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a href="http://r768n3l3z.hn-bkt.clouddn.com/demo.xlsx">
            点击下载模板
          </a>
        </el-tag>
      </el-form-item>
      <el-form-item label="选择excel">
        <el-upload
          ref="upload"
          :action="baseURL+'/eduservice/subject/addSubject'"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :auto-upload="false"
          :disabled="importBtnDisabled"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Save',
  data() {
    return {
      importBtnDisabled: false,
      baseURL: process.env.VUE_APP_BASE_API
    }
  },
  created() {
  },
  methods: {
    submitUpload() {
      this.importBtnDisabled = true
      this.$refs.upload.submit()
    },
    fileUploadSuccess(response) {
      if (response.success === true) {
        this.$message({
          type: 'success',
          message: response.message
        })
        this.$router.push('/edu-subject/table')
      }
    },
    fileUploadError(response) {
      this.$message({
        type: 'error',
        message: '导入失败'
      })
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div id="info">
    <h3 style="text-align: center">发布新课程</h3>
    <el-steps :active="active" finish-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写" />
      </el-form-item>

      <!-- 所属分类 TODO -->
      <el-form-item label="课程分类">
        <el-select v-model="courseInfo.subjectParentId" placeholder="请选择一级课程分类" @change="subjectLevelChange">
          <el-option
            v-for="item in oneSubjectList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-select>

        <el-select v-model="courseInfo.subjectId" placeholder="请选择课程详细分类">
          <el-option
            v-for="item in twoSubjectList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <!-- 课程讲师 TODO -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择讲师">
          <el-option
            v-for="item in teacherList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="总课时">

        <el-input-number v-model="courseInfo.lessonNum" :min="0" controls-position="right" placeholder="请填写课程的总课时数" />

      </el-form-item>
      <!-- 课程简介 TODO -->
      <el-form-item v-model="courseInfo.description">
        <el-input v-model="courseInfo.description" placeholder="简介" />
      </el-form-item>
      <!-- 课程封面 TODO -->
      <el-form-item label="课程封面">
        <el-upload
          :auto-upload="true"
          :action="baseURL+'/edu/oss/upload'"
          :on-success="handleSuccess"
          :before-upload="handleBul"
          :show-file-list="false"
        >
          <img :src="courseInfo.cover">
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number v-model="courseInfo.price" :min="0" controls-position="right" placeholder="免费课程请设置为0元" />
        元
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import subject from '@/api/subject'

const Form = {
  id: '',
  title: '',
  subjectId: '',
  subjectParentId: '',
  teacherId: '',
  lessonNum: 0,
  description: '',
  cover: 'http://r768n3l3z.hn-bkt.clouddn.com/2022/02/16/75b5a2dca2e84e60985d4eb9205ca84b.png',
  price: 0
}
import CourseApi from '@/api/course'
import SubjectApi from '@/api/subject'

export default {
  name: 'Info',
  data() {
    return {
      active: 0,
      saveBtnDisabled: false,
      courseInfo: Form,
      teacherList: [],
      cover: '',
      oneSubjectList: [],
      twoSubjectList: [],
      baseURL: process.env.VUE_APP_BASE_API
    }
  },
  watch: {
    $route(to, from) {
      console.log('watch route')
    }
  },
  created() {
    this.init()
    this.getTeacherList()
    this.getSubjectList()
  },
  methods: {
    saveOrUpdate() {
      console.log('next')
      if (this.courseInfo.id === '') {
        CourseApi.saveCourse(this.courseInfo).then(res => {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.$router.push('/edu-course/chapter/' + res.data.course_Id)
        })
      } else {
        CourseApi.updateCourseInfo(this.courseInfo).then(res => {
          if (res.data.code !== 20001) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$router.push('/edu-course/chapter/' + this.courseInfo.id)
          } else {
            this.$message({
              type: 'error',
              message: '修改失败'
            })
          }
        })
      }
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        console.log(this.$route.params.id)
        this.getCouresInfo(this.$route.params.id)
      } else {
        this.courseInfo = Form
      }
    },
    getTeacherList() {
      CourseApi.getTeacherList().then(res => {
        this.teacherList = res.data.list
      })
    },
    getSubjectList() {
      SubjectApi.getSubjectList().then(res => {
        this.oneSubjectList = res.data.list
      })
    },
    getCouresInfo(courseId) {
      CourseApi.getCourseInfo(courseId).then(res => {
        this.courseInfo = res.data.course
        subject.getSubjectList()
          .then(res => {
            this.oneSubjectList = res.data.list
            this.oneSubjectList.forEach(it => {
              if (it.id === this.courseInfo.subjectParentId) {
                this.twoSubjectList = it.children
              }
            })
          })

      })
      this.getTeacherList()
    },
    subjectLevelChange(pid) {
      this.oneSubjectList.forEach(it => {
        if (it.id === pid) {
          this.twoSubjectList = it.children
          this.courseInfo.subjectId = null
        }
      })
    },
    handleSuccess(response, file) {
      this.courseInfo.cover = response.data.url
    },
    handleBul(file) {
      // todo
      return true
    }
  }
}
</script>

<style scoped>

</style>

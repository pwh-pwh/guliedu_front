<template>
  <div id="chapter">
    <h3 style="text-align: center">发布新课程</h3>
    <el-steps :active="active" finish-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="提交审核"></el-step>
    </el-steps>

    <el-button type="text" @click="dialogChapterFormVisible=true">添加章节</el-button>
    <!-- 章节 -->
    <ul class="chapterList">
      <li
        v-for="chapter in chapterNestedList"
        :key="chapter.id"
      >
        <p>
          {{ chapter.title }}
          <span class="acts">
          <el-button type="text" @click="dialogVideoFormVisible=true; chapterId = chapter.id">添加课时</el-button>
          <el-button type="text" @click="editChapter(chapter.id)">编辑</el-button>
          <el-button type="text" @click="removeChapter(chapter.id)">删除</el-button>
        </span>
        </p>
        <!--视频-->
        <ul class="chapterList videoList">
          <li
            v-for="video in chapter.videos"
            :key="video.id"
          >
            <p>{{ video.title }}</p>
            <span class="acts">
            <el-button type="text" @click="editVideo(video.id)">编辑</el-button>
            <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
          </span>
          </li>

        </ul>

      </li>
    </ul>

    <el-form label-width="120px">
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title"/>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible=false">取消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课程标题">
          <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="课程排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right" />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.free">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
<!--          TODO-->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible=false">取消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">确认</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import chapterApi from '@/api/chapter'
import videoApi from '@/api/video'

export default {
  name: 'Chapter',
  data() {
    return {
      active: 1,
      saveBtnDisabled: false,
      courseId: '',
      chapterNestedList: [],
      dialogChapterFormVisible: false,
      chapter: {
        title: '',
        sort: 0
      },
      saveVideoBtnDisabled: false, // 课时按钮是否禁用
      dialogVideoFormVisible: false, // 是否显示课时表单
      chapterId: '',
      video: {
        title: '',
        sort: 0,
        free: true,
        videoSourceId: ''
      }
    }
  },
  methods: {
    next() {
      console.log('next')
      this.$router.push('/edu-course/publish/' + this.courseId)
    },
    previous() {
      this.$router.push('/edu-course/info/' + this.courseId)
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
        this.fetchChapterNestedListByCourseId()
      }
    },
    fetchChapterNestedListByCourseId() {
      chapterApi.getChapterList(this.courseId)
        .then(response => {
          this.chapterNestedList = response.data.list
        })
    },
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (this.chapter.id) {
        this.updateData()
      } else {
        this.saveData()
      }
    },
    saveData() {
      this.chapter.courseId = this.courseId
      chapterApi.addChapter(this.chapter).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.helpSave()
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: response.message
        })
      })
    },
    updateData() {
      chapterApi.updateChapter(this.chapter).then(response => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
        this.helpSave()
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: response.message
        })
      })
    },
    helpSave() {
      this.dialogChapterFormVisible = false
      this.fetchChapterNestedListByCourseId()
      this.chapter = {
        title: '',
        sort: 0
      }
      this.saveBtnDisabled = false
    },
    editChapter(chapterId) {
      this.dialogChapterFormVisible = true
      chapterApi.getChapterById(chapterId).then(response => {
        this.chapter = response.data.chapter
      })
    },
    removeChapter(chapterId) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return chapterApi.removeById(chapterId)
      }).then(() => {
        this.fetchChapterNestedListByCourseId()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }).catch((response) => {
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        } else {
          this.$message({
            type: 'error',
            message: response.message
          })
        }
      })
    },
    saveOrUpdateVideo() {
      this.saveVideoBtnDisabled = true
      if (!this.video.id) {
        this.saveVideoData()
      } else {
        this.updateVideoData()
      }
    },
    saveVideoData() {
      this.video.courseId = this.courseId
      this.video.chapterId = this.chapterId
      videoApi.saveVideoInfo(this.video).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.helpSaveVideo()
      })
    },
    updateVideoData() {
      this.video.courseId = this.courseId
      this.video.chapterId = this.chapterId
      videoApi.updateVideo(this.video).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.helpSaveVideo()
      })
    },

    helpSaveVideo() {
      this.dialogVideoFormVisible = false
      this.fetchChapterNestedListByCourseId()
      this.video = {
        title: '',
        sort: 0,
        videoSourceId: '',
        free: true
      }
      this.saveVideoBtnDisabled = false
    },
    editVideo(videoId) {
      this.dialogVideoFormVisible = true
      videoApi.getVideoById(videoId).then(response => {
        this.video = response.data.video
      })
    },
    removeVideo(videoId) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return videoApi.deleteVideo(videoId)
      }).then(() => {
        this.fetchChapterNestedListByCourseId()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }).catch((response) => {
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        } else {
          this.$message({
            type: 'error',
            message: response.message
          })
        }
      })
    }

  },
  created() {
    this.init()
  }
}
</script>

<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}

.chanpterList li {
  position: relative;

}

.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;

  line-height: 50px;
  width: 100%;

  border: 1px solid #DDD;
}

.chanpterList .acts {

  float: right;

  font-size: 14px;

}

.videoList {
  padding-left: 50px;
}

.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;

}

</style>

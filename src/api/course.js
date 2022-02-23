import request from '@/utils/request'

export default {
  saveCourse(courseInfo) {
    return request({
      url: '/eduservice/course/save',
      method: 'post',
      data: courseInfo
    })
  }
}

import request from '@/utils/request'

export default {
  saveCourse(courseInfo) {
    return request({
      url: '/eduservice/course/save',
      method: 'post',
      data: courseInfo
    })
  },
  getTeacherList() {
    return request({
      url: '/eduservice/edu-teacher/list',
      method: 'get'
    })
  },
  getCourseInfo(courseId) {
    return request({
      url: '/eduservice/course/courseInfo/' + courseId,
      method: 'get'
    })
  },
  updateCourseInfo(courseInfo) {
    return request({
      url: '/eduservice/course/update',
      method: 'post',
      data: courseInfo
    })
  },
  getCoursePublicInfo(courseId) {
    return request({
      url: '/eduservice/course/coursePublicInfo/' + courseId,
      method: 'get'
    })
  },
  publicCourse(courseId) {
    return request({
      url: '/eduservice/course/publicCourse/' + courseId,
      method: 'put'
    })
  },
  getPageList(page, limit, queryObj) {
    return request({
      url: '/eduservice/course/query/' + page + '/' + limit,
      method: 'get',
      params: queryObj
    })
  },
  deleteCourse(courseId) {
    return request({
      url: '/eduservice/course/' + courseId,
      method: 'delete'
    })
  }

}

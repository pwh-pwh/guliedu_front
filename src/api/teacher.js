import request from '@/utils/request'

export default {
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      url: `/eduservice/edu-teacher/${current}/${limit}`,
      method: 'post',
      data: teacherQuery
    })
  },
  delTeacherById(id) {
    return request({
      url: `/eduservice/edu-teacher/${id}`,
      method: 'delete'
    })
  },
  addTeacher(teacher) {
    return request({
      url: '/eduservice/edu-teacher',
      method: 'post',
      data: teacher
    })
  },
  getTeacherInfoById(id) {
    return request({
      url: `/eduservice/edu-teacher/${id}`,
      method: 'get'
    })
  },
  updateTeacherInfoById(teacher) {
    return request({
      url: `/eduservice/edu-teacher/${teacher.id}`,
      method: 'put',
      data: teacher
    })
  }

}

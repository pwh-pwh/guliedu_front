import request from '@/utils/request'

export default {
  getChapterList(courseId) {
    return request({
      url: '/eduservice/chapter/nested-list/' + courseId,
      method: 'get'
    })
  },
  removeById(chapterId) {
    return request({
      url: '/eduservice/chapter/deleteChapter/' + chapterId,
      method: 'delete'
    })
  },
  addChapter(chapter) {
    return request({
      url: '/eduservice/chapter/addChapter',
      method: 'post',
      data: chapter
    })
  },
  getChapterById(chapterId) {
    return request({
      url: '/eduservice/chapter/getChapter/' + chapterId,
      method: 'get'
    })
  },
  updateChapter(chapter) {
    return request({
      url: '/eduservice/chapter/updateChapter',
      method: 'post',
      data: chapter
    })
  }

}

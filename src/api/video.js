import request from '@/utils/request'

export default {
  saveVideoInfo(video) {
    return request({
      url: '/eduservice/edu-video',
      method: 'post',
      data: video
    })
  },
  updateVideo(video) {
    return request({
      url: '/eduservice/edu-video',
      method: 'put',
      data: video
    })
  },
  deleteVideo(id) {
    return request({
      url: '/eduservice/edu-video/' + id,
      method: 'delete'
    })
  },
  getVideoById(id) {
    return request({
      url: '/eduservice/edu-video/' + id,
      method: 'get'
    })
  }
}

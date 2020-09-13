const axios = require('axios')

const request = axios.create({
  baseURL: process.env.GRIDSOME_API_URL_GITHUB,
  timeout: process.env.GRIDSOME_API_TIMEOUT
})

const user = process.env.GRIDSOME_GITHUB_USERNAME


module.exports = {
  // 获取用户的粉丝列表
  followers: (username = user) => {
    return request({
      method: 'GET',
      url: `/users/${username}/followers`
    })
  },

  // 获取用户的关注列表
  following: (username = user) => {
    return request({
      method: 'GET',
      url: `/users/${username}/following`
    })
  },

  // 获取用户信息
  user: (username = user) => {
    return request({
      method: 'GET',
      url: `/users/${username}`
    })
  },

  // 获取用户开源项目列表
  repos: (username = user) => {
    return request({
      method: 'GET',
      url: `/users/${username}/repos`
    })
  },

  // 获取单个开源项目信息
  repo: (username = user, repo) => {
    return request({
      method: 'GET',
      url: `/repos/${username}/${repo}`
    })
  },

  // 获取单个开源项目的 README.md
  readme: (username = user, repo) => {
    return request({
      method: 'GET',
      url: `/repos/${username}/${repo}/contents/READMD.md`
    })
  }
}

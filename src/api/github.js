const axios = require('axios')

const request = axios.create({
  baseURL: process.env.GRIDSOME_API_URL_GITHUB,
  timeout: process.env.GRIDSOME_API_TIMEOUT,
  headers: {
    Authorization: `token ${process.env.GRIDSOME_GITHUB_TOKEN}`
  }
})

const user = process.env.GRIDSOME_GITHUB_USERNAME

module.exports = {
  // 获取用户的粉丝列表
  followers: (params) => {
    return request({
      method: 'GET',
      url: `/users/${user}/followers`,
      params
    })
  },

  // 获取用户的关注列表
  following: (params) => {
    return request({
      method: 'GET',
      url: `/users/${user}/following`,
      params
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
  repo: (repo, username = user) => {
    return request({
      method: 'GET',
      url: `/repos/${username}/${repo}`
    })
  },

  // 获取单个开源项目的 README.md
  readme: (repo, username = user) => {
    return request({
      method: 'GET',
      url: `/repos/${username}/${repo}/contents/README.md`
    })
  }
}

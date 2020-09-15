// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import DefaultLayout from '~/layouts/Default.vue'
import dayjs from 'dayjs'
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()

export default function(Vue, { router, head, isClient }) {
  const copy = message => {
    let doc = document.createElement('input')
    doc.value = message
    document.body.appendChild(doc)
    doc.select()
    let status
    try {
      status = document.execCommand('copy')
    } catch (e) {}
    document.body.removeChild(doc)
    return status
  }

  Vue.mixin({
    data() {
      return {
        githubusername: process.env.GRIDSOME_GITHUB_USERNAME,
        blogusername: process.env.GRIDSOME_BLOG_USERNAME
      }
    }
  })

  Vue.use(ElementUI)
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
    return dayjs(value).format(format)
  })
  Vue.filter('upper', value => {
    return String(value).toLocaleUpperCase()
  })

  Vue.prototype.$md = markdown => md.render(markdown)

  Vue.prototype.$share = function(message) {
    if (!message) {
      message = window.location
    } else {
      let origin = window.location.origin + ''
      message = origin + message
    }
    if (copy(message)) {
      Vue.prototype.$confirm('链接已复制,去分享给好友吧!!', '分享', {
        showCancelButton: false,
        showClose: false,
        type: 'success'
      })
    } else {
      Vue.prototype.$confirm('链接复制失败,可能因为浏览器不兼容', '分享', {
        showCancelButton: false,
        showClose: false,
        type: 'warning'
      })
    }
  }
}

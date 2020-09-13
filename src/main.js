// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import DefaultLayout from '~/layouts/Default.vue'
import dayjs from 'dayjs'
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()

export default function(Vue, { router, head, isClient }) {
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
      let arr = (window.location + '').split('#')
      message = arr[0] + '#' + message
    }
    if (util.copy(message)) {
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

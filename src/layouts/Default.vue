<template>
  <div>
    <section
      class="page-header"
      style="
        background-image: linear-gradient(120deg, #2690F9,  #FC2D2D);color: #fff;
      "
    >
      <div style="position:absolute; top:20px; right:20px; z-index:2;">
        <el-tooltip
          effect="dark"
          :content="fullButton.full ? '退出' : '全屏'"
          placement="bottom-end"
        >
          <el-button
            @click="full"
            :icon="fullButton.full ? 'el-icon-close' : 'el-icon-rank'"
            circle
          ></el-button>
        </el-tooltip>
      </div>
      <div
        v-for="(item, index) in randomIcon"
        :key="'ri' + index"
        :style="
          'position:absolute; top:' +
            item.top +
            'px; left:' +
            item.left +
            'px; z-index:1;'
        "
      >
        <font :style="'font-size: ' + item.size + 'px;color:#fff;'">
          <b>♪</b>
        </font>
      </div>
      <h1 class="project-name">My Simple Blog</h1>
      <h2 class="project-tagline">欢迎来到 {{ blogusername }} 的个人博客。</h2>
      <a
        :href="'https://github.com/' + githubusername"
        class="btn"
        target="_blank"
      >
        GitHub主页
      </a>
    </section>
    <section class="main-content">
      <el-row>
        <el-col :span="6" style="padding-right:10px">
          <sidebar></sidebar>
        </el-col>
        <el-col :span="18" style="padding-left:10px">
          <slot></slot>
        </el-col>
      </el-row>
    </section>
    <section class="foot">
      <foot></foot>
    </section>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import Foot from './components/Foot'

const randomInt = (s, e) => {
  let d = e - s
  if (d < 0) {
    return s
  }
  let r = Math.random() * d + s
  r = parseInt(r, 10)
  return r
}
const fullScreen = () => {
  var element = document.documentElement
  if (window.ActiveXObject) {
    var WsShell = new ActiveXObject('WScript.Shell')
    WsShell.SendKeys('{F11}')
  } else if (element.requestFullScreen) {
    element.requestFullScreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  }
}

const fullExit = () => {
  var element = document.documentElement
  if (window.ActiveXObject) {
    var WsShell = new ActiveXObject('WScript.Shell')
    WsShell.SendKeys('{F11}')
  } else if (element.requestFullScreen) {
    document.exitFullscreen()
  } else if (element.msRequestFullscreen) {
    document.msExitFullscreen()
  } else if (element.webkitRequestFullScreen) {
    document.webkitCancelFullScreen()
  } else if (element.mozRequestFullScreen) {
    document.mozCancelFullScreen()
  }
}
export default {
  components: {
    Sidebar,
    Foot
  },
  data() {
    return {
      fullButton: {
        full: false
      },
      randomIcon: []
    }
  },
  mounted() {
    let width = window.innerWidth
    for (let i = 0; i < 12; i++) {
      let temp = {}
      let left = randomInt(10, width - 310)
      if (left > width / 2 - 150) {
        left += 300
      }
      temp['left'] = left
      temp['top'] = randomInt(20, 300)
      temp['size'] = randomInt(20, 40)
      this.randomIcon.push(temp)
    }
  },
  created() {},
  methods: {
    full() {
      if (!this.fullButton.full) {
        fullScreen()
        this.fullButton.full = true
      } else {
        fullExit()
        this.fullButton.full = false
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
.page-header {
  padding: 5rem 6rem;
  color: #fff;
  text-align: center;
  background-color: #159957;
  background-image: linear-gradient(120deg, #155799, #159957);
}

.project-name {
  font-size: 3.25rem;
  margin-top: 0;
  margin-bottom: 0.1rem;
}

.project-tagline {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  font-weight: normal;
  opacity: 0.7;
}

.btn:hover {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

a:hover {
  text-decoration: underline;
}

a:active,
a:hover {
  outline: 0;
}

.btn {
  padding: 0.75rem 1rem;
  display: inline-block;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.7);
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  border-style: solid;
  border-width: 1px;
  border-radius: 0.3rem;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;
}

a {
  color: #1e6bb8;
  text-decoration: none;
}

.btn + .btn {
  margin-left: 1rem;
}

.main-content {
  max-width: 64rem;
  padding: 30px 0px 30px 0px;
  margin: 0 auto;
  font-size: 1.1rem;
  word-wrap: break-word;
  min-height: 800px;
}

.foot {
  max-width: 67rem;
  margin: 0 auto;
  font-size: 12px !important;
  color: #586069 !important;
  word-wrap: break-word;
}
</style>

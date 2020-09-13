<template>
  <div>
    <el-card shadow="never">
      <el-menu :default-active="active" @select="onSelect">
        <el-menu-item
          v-for="item in constantRouterMap"
          :key="item.path"
          :index="item.path"
        >
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      constantRouterMap: [
        {
          path: '/',
          title: '最新动态',
          icon: 'el-icon-star-off'
        },
        {
          path: '/social',
          title: '社交圈',
          icon: 'el-icon-mobile-phone'
        },
        {
          path: '/blog',
          title: '博客列表',
          icon: 'el-icon-edit-outline'
        },
        {
          path: '/project',
          title: '开源项目',
          icon: 'el-icon-service'
        }
      ],
      active: ''
    }
  },
  mounted() {
    let arr = location.pathname.split('/')
    this.active = '/' + arr[1]
  },
  methods: {
    onSelect(index) {
      this.$router.push(index)
    }
  }
}
</script>

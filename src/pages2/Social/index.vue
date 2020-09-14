<template>
  <Layout>
    <div>
      <el-card
        shadow="never"
        style="min-height: 400px;margin-bottom: 20px;padding: 0px 0px 20px 0px"
      >
        <el-tabs v-model="activeTab" type="card" @tab-click="changeTab">
          <el-tab-pane
            :label="'粉丝 ' + pageInfo.totalItems"
            name="followers"
            style="padding: 5px"
          ></el-tab-pane>
          <el-tab-pane
            :label="'关注 ' + followingTotal"
            name="following"
            style="padding: 5px"
          ></el-tab-pane>
        </el-tabs>
        <div v-if="followers && followers.length">
          <el-row style="min-height: 200px; ">
            <el-col
              :span="8"
              v-for="item in followers"
              :key="item.id"
              style="padding: 10px"
            >
              <el-card
                shadow="hover"
                style="font-size: 13px;color: #606266;line-height: 20px"
              >
                <i class="el-icon-star-off"></i>
                &emsp;
                <a
                  :href="`/user/social/detail/${item.login}`"
                  style=" text-decoration:none;cursor:pointer"
                >
                  {{ item.login }}
                </a>
                <br />
                <i class="el-icon-message"></i>
                &emsp;
                <a
                  :href="item.html_url"
                  target="_blank"
                  style=" text-decoration:none;cursor:pointer"
                >
                  TA的主页
                </a>
                <br />
                <img
                  :src="item.avatar_url"
                  style="width: 100%;border-radius:5px;margin-top: 5px"
                />
              </el-card>
            </el-col>
          </el-row>
          <div style="text-align: center;margin-top: 10px">
            <el-pagination
              @current-change="changePage"
              background
              layout="prev, pager, next"
              :current-page.sync="pageInfo.currentPage"
              :page-size="pageInfo.perPage"
              :total="pageInfo.totalPages"
            ></el-pagination>
          </div>
        </div>
        <div
          style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center"
          v-else
        >
          <font style="font-size: 30px;color:#dddddd ">
            <b>(￢_￢) 没有一个粉丝</b>
          </font>
        </div>
      </el-card>
    </div>
  </Layout>
</template>

<page-query>
query ($page: Int){
  allFollowers(limit:100, perPage: 9, page: $page) @paginate {
    pageInfo {
      currentPage
      totalPages
      perPage
      totalItems
    }

    edges {
      node {
        id
        login
        html_url
        avatar_url
      }
    }
  }
  allFollowing {
    totalCount
  }
}
</page-query>

<script>
export default {
  name: 'SocialPage',
  metaInfo: {
    title: '社交圈(粉丝)'
  },
  data() {
    return {
      activeTab: 'followers'
    }
  },
  computed: {
    followers() {
      return this.$page.allFollowers.edges.map(edge => edge.node)
    },
    pageInfo() {
      return this.$page.allFollowers.pageInfo
    },
    followingTotal() {
      return this.$page.allFollowing.totalCount
    }
  },
  methods: {
    changeTab(tab) {
      if (tab.name === 'following') {
        location.href = '/social/following'
      } else {
        location.href = '/social'
      }
    },
    changePage(page) {
      if (page == 1) {
        window.location.href = `/social`
      } else {
        window.location.href = `/social/${page}`
      }
    }
  }
}
</script>

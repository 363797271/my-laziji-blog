<template>
  <Layout>
    <div v-loading="loading">
      <el-card
        shadow="never"
        style="min-height: 400px;margin-bottom: 20px;padding: 0px 0px 20px 0px"
      >
        <el-tabs v-model="activeTab" type="card" @tab-click="changeTab">
          <el-tab-pane
            :label="'粉丝 ' + totalCount.followers"
            name="followers"
            style="padding: 5px"
          ></el-tab-pane>
          <el-tab-pane
            :label="'关注 ' + totalCount.following"
            name="following"
            style="padding: 5px"
          ></el-tab-pane>
        </el-tabs>
        <div v-if="list && list.length">
          <el-row style="min-height: 200px; ">
            <el-col
              :span="8"
              v-for="item in list"
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
                  :href="`/social/detail?login=${item.login}`"
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
              :total="total"
            ></el-pagination>
          </div>
        </div>
        <div
          style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center"
          v-else
        >
          <font style="font-size: 30px;color:#dddddd ">
            <b>
              (￢_￢)
              {{
                activeTab === 'followers' ? '没有一个粉丝' : '还没有关注一个人'
              }}
            </b>
          </font>
        </div>
      </el-card>
    </div>
  </Layout>
</template>

<script>
import { user, followers, following } from '@/api/github'
export default {
  name: 'SocialPage',
  metaInfo: {
    title: '社交圈'
  },
  data() {
    return {
      loading: false,
      activeTab: 'followers',
      pageInfo: {
        currentPage: 1,
        perPage: 9
      },
      totalCount: {
        followers: 0,
        following: 0
      },
      list: []
    }
  },
  computed: {
    total() {
      return this.activeTab === 'followers'
        ? this.totalCount.followers
        : this.totalCount.following
    },
    followingTotal() {
      return this.$page.allFollowing.totalCount
    }
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab.name
      this.pageInfo.currentPage = 1
      this.query()
    },
    changePage(page) {
      this.pageInfo.currentPage = Number(page)
      this.query()
    },
    async user() {
      try {
        const { data } = await user()
        this.totalCount.followers = data.followers
        this.totalCount.following = data.following
      } catch (err) {
        console.log(err.message)
      }
    },
    async query() {
      const api = this.activeTab === 'followers' ? followers : following
      this.loading = true
      try {
        const { data } = await api(this.pageInfo)
        this.list = data
      } catch (err) {
        console.log(err.message)
      } finally {
        this.loading = false
      }
    }
  },
  async created() {
    await this.user()
    this.query()
  }
}
</script>

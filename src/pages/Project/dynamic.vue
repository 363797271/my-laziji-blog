<template>
  <Layout>
    <div style="min-height: 600px" v-loading="loading">
      <el-card shadow="never" style="margin-bottom: 20px">
        <el-input
          placeholder="请输入关键字"
          v-model="searchKey"
          clearable
          style="width: 300px"
        ></el-input>
        <el-button
          @click="search"
          icon="el-icon-search"
          style="margin-left: 10px"
          circle
          plain
        ></el-button>
        <el-button
          @click="$share()"
          icon="el-icon-share"
          type="warning"
          style="margin-left: 10px"
          plain
          circle
        ></el-button>
      </el-card>

      <div v-if="repos && repos.length > 0">
        <el-card
          shadow="hover"
          v-for="item in list"
          :key="item.id"
          style="margin-bottom: 20px"
        >
          <div slot="header">
            <el-row>
              <el-col :span="16">
                <span>
                  <a
                    style="text-decoration:none;cursor:pointer"
                    :href="`/project/detail?name=${item.name}`"
                  >
                    <i class="el-icon-service"></i>
                    &nbsp;&nbsp; {{ item.name }}
                  </a>
                </span>
              </el-col>
              <el-col :span="8">
                <div style="text-align: right;">
                  <el-button
                    @click="goGithub(item.url)"
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-back"
                  >
                    前往GitHub
                  </el-button>
                  <el-button
                    @click="$share('/project/detail?name=' + item.name)"
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-share"
                  ></el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
            最近更新 {{ item.updated_at | date }}
          </div>
          <div
            style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px"
          >
            {{ item.description }}
          </div>
          <div
            style="font-size: 1.1rem;color: #303133;padding: 10px 0px 0px 0px"
          >
            <el-row>
              <el-col :span="16" style="padding-top: 5px">
                <el-tooltip
                  effect="dark"
                  :content="'star ' + item.stargazers_count"
                  placement="bottom"
                >
                  <i
                    class="el-icon-star-off"
                    style="margin: 0px 5px 0px 0px"
                  ></i>
                </el-tooltip>
                {{ item.stargazers_count }}
                <el-tooltip
                  effect="dark"
                  :content="'watch ' + item.watchers_count"
                  placement="bottom"
                >
                  <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
                </el-tooltip>
                {{ item.watchers_count }}
                <el-tooltip
                  effect="dark"
                  :content="'fork ' + item.forks_count"
                  placement="bottom"
                >
                  <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
                </el-tooltip>
                {{ item.forks_count }}
              </el-col>
              <el-col :span="8" style="text-align: right;">
                <el-tag
                  size="small"
                  type="danger"
                  v-if="item.license && item.license.spdx_id"
                >
                  {{ item.license.spdx_id | upper }}
                </el-tag>
                <el-tag
                  size="small"
                  type="success"
                  style="margin-left:5px"
                  v-if="item.language"
                >
                  {{ item.language | upper }}
                </el-tag>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <div style="text-align: center">
          <el-pagination
            @current-change="changePage"
            background
            layout="prev, pager, next"
            :current-page.sync="pageInfo.currentPage"
            :page-size="pageInfo.perPage"
            :total="totalCount"
          ></el-pagination>
        </div>
      </div>

      <el-card
        shadow="never"
        style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center"
        v-if="!repos || repos.length == 0"
      >
        <font style="font-size: 30px;color:#dddddd ">
          <b>还没有开源项目 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>

<script>
import { user, repos } from '@/api/github'
export default {
  name: 'ProjectPage',
  metaInfo: {
    title: '开源项目'
  },
  data() {
    return {
      loading: true,
      searchKey: '',
      repos: [],
      list: [],
      pageInfo: {
        currentPage: 1,
        perPage: 5
      },
      totalCount: 0
    }
  },
  methods: {
    changePage(page) {
      this.pageInfo.currentPage = Number(page)
      this.getRepos()
    },
    goGithub(url) {
      window.open(url)
    },
    async user() {
      try {
        const { data } = await user()
        this.totalCount = data.public_repos
      } catch (err) {
        console.log(err.message)
      }
    },
    async getRepos() {
      this.loading = true
      try {
        const { data } = await repos({
          per_page: this.pageInfo.perPage,
          page: this.pageInfo.currentPage
        })
        this.repos = data
        this.search()
      } catch (err) {
        console.log(err.message)
      } finally {
        this.loading = false
      }
    },
    search() {
      this.list = this.repos.filter(v => v.name.includes(this.searchKey))
    }
  },
  async created() {
    await this.user()
    this.getRepos()
  }
}
</script>

<style></style>

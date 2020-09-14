<template>
  <Layout>
    <div style="min-height: 600px">
      <!-- <el-card shadow="never" style="margin-bottom: 20px">
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
      </el-card> -->

      <div v-if="repos && repos.length > 0">
        <el-card
          shadow="hover"
          v-for="item in repos"
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
                  :content="'star ' + item.stargazerCount"
                  placement="bottom"
                >
                  <i
                    class="el-icon-star-off"
                    style="margin: 0px 5px 0px 0px"
                  ></i>
                </el-tooltip>
                {{ item.stargazerCount }}
                <el-tooltip
                  effect="dark"
                  :content="'watch ' + item.watcherCount"
                  placement="bottom"
                >
                  <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
                </el-tooltip>
                {{ item.watcherCount }}
                <el-tooltip
                  effect="dark"
                  :content="'fork ' + item.forkCount"
                  placement="bottom"
                >
                  <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
                </el-tooltip>
                {{ item.forkCount }}
              </el-col>
              <el-col :span="8" style="text-align: right;">
                <el-tag size="small" type="danger" v-if="item.license">
                  {{ item.license | upper }}
                </el-tag>
                <template v-if="item.language">
                  <el-tag
                    size="small"
                    type="success"
                    style="margin-left:5px"
                    v-for="lang in item.language"
                    :key="lang.name"
                  >
                    {{ lang.name | upper }}
                  </el-tag>
                </template>
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
            :total="pageInfo.totalCount"
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

<page-query>
query {
  metadata {
    githubData {
      viewer {
        repositories {
          totalCount
          nodes{
            id
            name
            url
            description
            updatedAt
            stargazers {
              totalCount
            }
            watchers {
              totalCount
            }
            forkCount
            licenseInfo {
              spdxId
            }
            languages {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  }
}
</page-query>
<script>
export default {
  name: 'ProjectPage',
  metaInfo: {
    title: '开源项目'
  },
  data() {
    return {
      perPage: 5,
      currentPage: this.$route.query.page || 1
    }
  },
  computed: {
    repositories() {
      return this.$page.metadata.githubData.viewer.repositories.nodes.map(
        node => {
          return Object.assign(node, {
            stargazerCount: node.stargazers ? node.stargazers.totalCount : 0,
            watcherCount: node.watchers ? node.watchers.totalCount : 0,
            license: node.license ? node.license.spdxId : null,
            language: node.languages ? node.languages.nodes || [] : []
          })
        }
      )
    },
    repos() {
      return this.repositories.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      )
    },
    pageInfo() {
      const perPage = this.perPage
      const totalCount = this.$page.metadata.githubData.viewer.repositories
        .totalCount
      return {
        currentPage: this.currentPage || 1,
        perPage,
        totalCount
      }
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = Number(page)
    },
    goGithub(url) {
      window.open(url)
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>

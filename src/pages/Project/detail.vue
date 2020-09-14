<template>
  <Layout>
    <div style="min-height: 600px" v-loading="loading">
      <el-card shadow="never" style="min-height: 400px">
        <div slot="header">
          <el-row>
            <el-col :span="12">
              <span>{{ project.name }}</span>
            </el-col>
            <el-col :span="12">
              <div style="text-align: right;">
                <el-button
                  @click="$share()"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-share"
                >
                  分享
                </el-button>
                <el-button
                  @click="goGithub(project.url)"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-back"
                >
                  前往GitHub
                </el-button>
                <el-button
                  @click="more"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-more-outline"
                >
                  更多项目
                </el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
          发布 {{ project.created_at | date }}
          <br />
          更新 {{ project.updated_at | date }}
        </div>
        <div
          style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 20px 0px 0px 0px"
        >
          {{ project.description }}
        </div>
        <div
          style="font-size: 1.1rem;color: #303133;padding: 15px 0px 15px 0px;border-bottom: 1px solid #E4E7ED;"
        >
          <el-row>
            <el-col :span="16" style="padding-top: 5px">
              <el-tooltip
                effect="dark"
                :content="'star ' + project.stargazers_count"
                placement="bottom"
              >
                <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
              </el-tooltip>
              {{ project.stargazers_count }}
              <el-tooltip
                effect="dark"
                :content="'watch ' + project.watchers_count"
                placement="bottom"
              >
                <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
              </el-tooltip>
              {{ project.watchers_count }}
              <el-tooltip
                effect="dark"
                :content="'fork ' + project.forks_count"
                placement="bottom"
              >
                <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
              </el-tooltip>
              {{ project.forks_count }}
            </el-col>
            <el-col :span="8" style="text-align: right">
              <el-tag size="small" type="danger" v-if="project.license && project.license.spdx_id ">
                {{ project.license.spdx_id }}
              </el-tag>
              <el-tag size="small" type="success" v-if="project.language">
                {{ project.language }}
              </el-tag>
            </el-col>
          </el-row>
        </div>
        <div
          v-html="content"
          v-if="content"
          class="markdown-body"
          style="padding-top: 20px"
        ></div>
        <div
          v-if="!content"
          style="padding: 20px 0px 20px 0px;text-align: center"
        >
          <font style="font-size: 30px;color:#dddddd ">
            <b>还没有介绍 (╯°Д°)╯︵ ┻━┻</b>
          </font>
        </div>
      </el-card>
    </div>
  </Layout>
</template>

<script>
import { Base64 } from 'js-base64'
import { repo, readme } from '@/api/github'
export default {
  name: 'ProjectDetailPage',
  data() {
    return {
      loading: false,
      name: this.$route.query.name || '',
      project: {},
      content: ''
    }
  },
  methods: {
    goGithub(url) {
      window.open(url)
    },
    more() {
      this.$router.push('/project')
    },
    async getDetail() {
      this.loading = true
      try {
        const [{ data:projectData }, { data:readmeData }] = await Promise.all([
          repo(this.name),
          readme(this.name)
        ])

        this.project = projectData
        this.content = this.$md(Base64.decode(readmeData.content))
      } catch (err) {
        console.log(err.message)
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    if (this.name) {
      this.getDetail()
    }
  }
}
</script>

<style></style>

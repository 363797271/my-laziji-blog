<template>
  <Layout>
    <div v-loading="loading">
      <el-card shadow="never" style="min-height: 400px;margin-bottom: 20px;">
        <div slot="header" class="clearfix">
          <span>{{ login }}</span>
          <el-button
            @click="$router.go(-1)"
            style="float: right; padding: 3px 0"
            type="text"
            icon="el-icon-d-arrow-left"
          >
            返回
          </el-button>
        </div>
        <el-row>
          <el-col :span="9" style="padding: 0px 10px 20px 0px">
            <img
              :src="userInfo.avatar_url"
              style="width: 100%;border-radius:5px;"
            />
            <div style="padding: 10px">
              <font style="font-size: 26px;line-height: 40px;font-weight: 600">
                {{ userInfo.name }}
                <br />
              </font>
              <font
                style="font-size: 20px;font-style: normal;font-weight: 300;line-height: 35px;color: #666;"
              >
                {{ login }}
                <br />
              </font>
              <font
                style="font-size: 14px;line-height: 20px;color:#606266;"
                v-if="userInfo.location"
              >
                <i class="el-icon-location-outline"></i>
                &nbsp;&nbsp;{{ userInfo.location }}
                <br />
              </font>
              <font
                style="font-size: 14px;line-height: 20px;color:#606266;"
                v-if="userInfo.email"
              >
                <i class="el-icon-message"></i>
                &nbsp;&nbsp;{{ userInfo.email }}
                <br />
              </font>
              <font style="font-size: 14px;color:#606266;" v-if="userInfo.blog">
                <i class="el-icon-edit-outline"></i>
                &nbsp;&nbsp;
                <a :href="addHttp(userInfo.blog)" target="_blank">
                  {{ userInfo.blog }}
                </a>
                <br />
              </font>
            </div>
          </el-col>
          <el-col :span="15" style="padding: 0px 20px 20px 10px">
            <div
              style="width: 100%;min-height: 300px; border-radius:5px; border: 1px solid #EBEEF5;padding: 10px;font-size: 16px;
                    color: #6a737d;"
              v-if="userInfo.bio"
            >
              {{ userInfo.bio }}
            </div>
            <div
              style="width: 100%;min-height: 300px; border-radius:5px; border: 1px solid #EBEEF5;padding: 30px;text-align: center;
                    font-size: 30px;color:#dddddd"
              v-else
            >
              <b>◔ ‸◔？没有简介</b>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </Layout>
</template>

<script>
import { user } from '@/api/github'
export default {
  name: 'SocialDetailPage',
  metaInfo() {
    return {
      title: this.$route.query.login || ''
    }
  },
  data() {
    return {
      login: this.$route.query.login || '',
      loading: false,
      userInfo: {}
    }
  },
  computed: {},
  methods: {
    async user() {
      this.loading = true
      try {
        const { data } = await user(this.login)
        this.userInfo = data
      } catch (err) {
        console.log(err.message)
      } finally {
        this.loading = false
      }
    },
    addHttp(url) {
      return (url.match(/https?:\/\//i) ? '' : 'https://') + url
    }
  },
  created() {
    this.user()
  }
}
</script>

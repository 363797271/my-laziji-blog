<template>
  <Layout>
    <div style="min-height: 600px">
      <!-- <el-card shadow="never" style="margin-bottom: 20px">
            <el-input placeholder="请输入关键字" v-model="searchKey" clearable style="width: 300px"></el-input>
            <el-button @click="search" icon="el-icon-search" style="margin-left: 10px" circle plain></el-button>
            <el-button @click="$share()" style="margin-left: 10px" icon="el-icon-share" type="warning" plain circle></el-button>
            <el-button type="primary" icon="el-icon-edit" round plain style="float: right;" @click="goAdd">写博文</el-button>
        </el-card> -->

      <template v-if="blogs && blogs.length > 0">
        <el-card
          shadow="hover"
          v-for="blog in blogs"
          :key="blog.id"
          style="margin-bottom: 20px"
        >
          <div slot="header">
            <el-row>
              <el-col :span="16">
                <span>
                  <g-link
                    :to="`/blog/detail/${blog.id}`"
                    style="text-decoration:none;cursor:pointer"
                  >
                    <i class="el-icon-edit-outline"></i>
                    &nbsp;&nbsp; {{ blog.title }}
                  </g-link>
                </span>
              </el-col>
              <el-col :span="8">
                <div style="text-align: right;">
                  <el-button
                    @click="$share('/blog/detail/' + blog.id)"
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-share"
                  ></el-button>
                  <!-- <el-button @click="editBlog(blog.id)" style="padding: 3px 0" type="text" icon="el-icon-edit" v-if="token"></el-button>
                                <el-button @click="deleteBlog(blog.id)" style="padding: 3px 0" type="text" icon="el-icon-delete" v-if="token"></el-button> -->
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
            最近更新 {{ blog.updated_at | date }}
          </div>
          <div
            v-if="blog.description"
            style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px"
          >
            {{ blog.description }}
          </div>
        </el-card>
        <div style="text-align: center">
          <el-pagination
            @current-change="changePage"
            background
            layout="prev, pager, next"
            :current-page.sync="pageInfo.currentPage"
            :page-size="pageInfo.perPage"
            :total="pageInfo.totalItems"
          ></el-pagination>
        </div>
      </template>

      <el-card
        shadow="never"
        style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center"
        v-if="!blogs || blogs.length == 0"
      >
        <font style="font-size: 30px;color:#dddddd ">
          <b>还没有博客 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>

<page-query>
query ($page: Int){
  allStrapiBlog(limit:100, perPage: 5, page: $page) @paginate {
    pageInfo {
      currentPage
      totalPages
      perPage
      totalItems
    }

    edges {
      node {
        id
        title
        description
        content
        created_at
        updated_at
      }
    }
  }
}
</page-query>
<script>
export default {
  name: 'BlogPage',
  metaInfo: {
    title: '博客列表'
  },
  computed: {
    blogs() {
      return this.$page.allStrapiBlog.edges.map(edge => edge.node)
    },
    pageInfo() {
      return this.$page.allStrapiBlog.pageInfo
    }
  },
  methods: {
    changePage(page) {
      this.$router.push(`/blog` + (page == 1 ? '' : `/${page}`))
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>

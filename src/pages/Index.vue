<template>
  <Layout>
    <div style="min-height: 600px">
      <template v-if="posts && posts.length > 0">
        <el-card
          v-for="post in posts"
          :key="post.id"
          shadow="never"
          style="min-height: 400px"
        >
          <div slot="header">
            <span>{{ post.title }}</span>
          </div>
          <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
            发布 {{ post.created_at | date }}
            <br />
            更新 {{ post.updated_at | date }}
          </div>
          <div
            style="font-size: 1.1rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #E4E7ED;padding: 5px 0px 5px 0px"
            v-if="post.description"
          >
            <pre style="font-family: '微软雅黑'">{{ post.description }}</pre>
          </div>
          <div
            v-html="$md(post.content)"
            class="markdown-body"
            style="padding-top: 20px"
          ></div>
        </el-card>
      </template>
      <el-card
        shadow="never"
        style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center"
        v-if="!posts || posts.length == 0"
      >
        <font style="font-size: 30px;color:#dddddd ">
          <b>没有更新 ╮(๑•́ ₃•̀๑)╭</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>

<page-query>
query {
  allStrapiPost(
    filter: { is_publish: { eq: true }, tags: { id: { in: [4] } } }
    limit: 5
  ) {
    edges {
      node {
        title
        content
        description
        created_at
        updated_at
      }
    }
  }
}
</page-query>
<script>
export default {
  name: 'IndexPage',
  metaInfo: {
    title: '最新动态'
  },
  computed: {
    posts() {
      return this.$page.allStrapiPost.edges.map(edge => edge.node)
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>

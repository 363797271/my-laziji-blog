# 仿 Laziji VBlog 博客

[Github - Laziji vBlog](https://github.com/GitHub-Laziji)

# Github 数据问题

尝试了两个方式生成静态页面：

1. [Github API](https://docs.github.com/cn/rest) 使用Gridsome生成GraphQL时经常失败（已授权）。

2. [Github GraphQL API](https://docs.github.com/en/graphql) 未能找到如何分页，【开源项目】列表页用该方式查询前100条数据，在页面中用JS进行分页展示。

项目详情、粉丝/关注者列表、用户详情最终改为动态请求获取。

Github API：

  - 获取用户的粉丝列表 `GET /users/{username}/followers`
  -
  - 获取用户的的关注列表 `GET /users/{username}/following`

  - 获取用户信息 `GET /users/{username}`

  - 获取用户开源项目列表 `GET /users/{username}/repos`

  - 获取单个开源项目的信息 `GET /repos/{owner}/{repo}`

  - 获取单个开源项目的README.md `GET /repos/{owner}/{repo}/contents/README.md`

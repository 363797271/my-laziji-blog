# 仿 Laziji VBlog 博客

[Github - Laziji vBlog](https://github.com/GitHub-Laziji)

# Github 数据问题

[Github GraphQL API](https://docs.github.com/en/graphql) 获取的数据无法分页和查询，【开源项目】列表页保留了这个方式的实现。

[Github API](https://docs.github.com/cn/rest) 使用Gridsome生成GraphQL时经常失败（已授权）。

使用 Github API 配合 GraphQL 会导致 Gridsome build 的时候，一直卡在  Execute GraphQL（怀疑是一直重复请求）。

最终改为动态请求获取。

Github API：

  - 获取用户的粉丝列表 `GET /users/{username}/followers`
  - 获取用户的的关注列表 `GET /users/{username}/following`

  - 获取用户信息 `GET /users/{username}`

  - 获取用户开源项目列表 `GET /users/{username}/repos`

  - 获取单个开源项目的信息 `GET /repos/{owner}/{repo}`

  - 获取单个开源项目的README.md `GET /repos/{owner}/{repo}/contents/README.md`

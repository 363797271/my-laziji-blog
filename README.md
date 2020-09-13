# 仿 Laziji VBlog 博客

[Github - Laziji vBlog](https://github.com/GitHub-Laziji)

# API 使用

- [Github API](https://docs.github.com/cn/rest)

  - 获取用户的粉丝列表 `GET /users/{username}/followers`
  - 获取用户的的关注列表 `GET /users/{username}/following`

  - 获取用户信息 `GET /users/{username}`

  - 获取用户开源项目列表 `GET /users/{username}/repos`

  - 获取单个开源项目的信息 `GET /repos/{owner}/{repo}`

  - 获取单个开源项目的README.md `GET /repos/{owner}/{repo}/contents/README.md`

- Strapi



# 模式

- 静态模式（默认） - 站内数据相关页面由 Gridsome 静态生成
  - 为避免频发发文触发部署任务，已关闭站点的自动编译部署功能。由博主定期手动编译。
  - 所以静态模式下不允许搜索、新建博文。
- 动态模式 - 站内数据动态请求
  - 动态模式下菜单地址变更，页面加载后动态请求API获取最新数据。
  - 所以该动态模式下可以搜索、新建博文，并即时更新。

切换动态模式，站点将变为 SFC 单页面应用。


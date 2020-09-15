// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'ZydBlog',
  icon: '/src/favicon.png',
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: process.env.GRIDSOME_API_URL_STRAPI,
        queryLimit: 100, // Defaults to 100
        contentTypes: ['post', 'blog'],
        // singleTypes: ['impressum'],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
      }
    },
    // {
    //   use: `gridsome-source-github-api`,
    //   options: {
    //     token: process.env.GRIDSOME_GITHUB_TOKEN,
    //     variables: {
    //       page: 1
    //     },
    //     graphQLQuery: `
    //       query{
    //         viewer {
    //           repositories(first: 100) {
    //             totalCount
    //             nodes {
    //               id
    //               name
    //               url
    //               description
    //               updatedAt
    //               stargazers(first: 100) {
    //                 totalCount
    //               }
    //               watchers(first: 100) {
    //                 totalCount
    //               }
    //               forkCount
    //               licenseInfo {
    //                 spdxId
    //               }
    //               languages(first: 100) {
    //                 nodes {
    //                   name
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //       `
    //   }
    // }
  ],
  templates: {
    StrapiBlog: [
      {
        path: '/blog/detail/:id',
        component: './src/templates/blog.vue'
      }
    ],
    // Project: [
    //   {
    //     path: '/project/detail/:name',
    //     component: './src/templates/project.vue'
    //   }
    // ]
  }
}

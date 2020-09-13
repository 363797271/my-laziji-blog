// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const apis = require('./src/api/github')

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/

    const tasks = [];
    ['followers', 'following', 'repos'].forEach(key => {
      tasks.push(async () => {
        const collection = addCollection(key)
        try {
          const { data } = await apis[key]()
          if (data) {
            data.forEach(item => {
              collection.addNode(item)
            })
          }
        } catch (err) {}
      })
    })

    await Promise.all(tasks.map(v => v()))

  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}

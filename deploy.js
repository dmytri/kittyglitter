;(function () {
  const fs = require('fs')
  const glob = require('glob')
  const pkgcloud = require('pkgcloud')

  const client = pkgcloud.storage.createClient({
    provider: 'rackspace',
    username: process.env.RACKSPACE_USERNAME,
    apiKey: process.env.RACKSPACE_API_KEY,
    region: process.env.RACKSPACE_REGION,
  })

  glob.sync('build/*').forEach((file) => {
    const remote = file.split('/').pop()
    const read = fs.createReadStream(file)

    const write = client.upload({
      container: process.env.RACKSPACE_CONTAINER,
      remote: remote
    })

    write.on('error', function(err) {
      console.error(err)
    })

    write.on('success', function(read) {
      console.log(read.toJSON())
    })

    read.pipe(write)
  })
}())

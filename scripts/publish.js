module.exports = function (context, callback) {
  callback(null, 'OK')
  const https = require('https');
  function snap(method, path, callback) {
    const options = {
      hostname: 'api.snap-ci.com',
      auth: [context.data.snap_username, context.data.snap_api_key].join(':'),
      port: 443,
      path: path,
      method: method
    };
    const req = https.request(options, (res) => {
      res.on('data', (d) => {
        if (callback) callback(d)
      });
    });
    req.on('error', (e) => {
      console.error(e);
    });
    req.end();
  }
  snap('GET', '/project/dmytri/kittyglitter/branch/production/pipelines/newest', function (d) {
    const counter = JSON.parse(d)._links.redirect.href.split('/').pop()
    snap('GET', '/project/dmytri/kittyglitter/branch/production/pipelines/' + counter, function (d) {
      const stages = JSON.parse(d).stages
      var ready = true
      stages.forEach(function (stage) {
        ready = stage.duration ? ready : false
      })
      if (ready) {
        snap('POST', '/project/dmytri/kittyglitter/branch/production/trigger/' + counter + '/BUILD' )
        process.stdout.write('trigger sent\n');
      } else {
        process.stdout.write('already running\n');
      }
    })
  })
}

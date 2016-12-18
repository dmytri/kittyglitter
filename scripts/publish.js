;(function () {
  const https = require('https');

  const options = {
    hostname: 'api.snap-ci.com',
    auth: 'dmytri:' + process.env.SNAP_API_KEY,
    port: 443,
    path: '/project/dmytri/kittyglitter/branch/production/trigger',
    method: 'POST'
  };

  const req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.end();

}())


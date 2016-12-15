;(function () {
var Metalsmith = require('metalsmith')
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var contentful = require('contentful-metalsmith');

Metalsmith(__dirname)
  .source('src')
  .destination('build')
  .use(markdown())
  .use(layouts({
    engine: 'mustache'
  }))    
  .use(contentful({
    space_id : process.env.SPACE_ID,
    access_token : process.env.ACCESS_TOKEN
  }))
  .build(function(err) {
    if (err) throw err
    else console.log("OK")
  })
}())

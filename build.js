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
    space_id : process.env.CONTENTFUL_SPACE_ID,
    access_token : process.env.CONTENTFUL_ACCESS_TOKEN
  }))
  .build(function(err) {
    console.log(process.env.SPACE_ID)
    console.log(process.env.ACCESS_TOKEN)
    if (err) throw err
    else console.log("OK")
  })
}())

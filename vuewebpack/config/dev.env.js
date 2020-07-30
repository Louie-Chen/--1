'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HTTP_PATH: '"http://localhost:8080/"',
  APIPATH : '"https://vue-course-api.hexschool.io"',
  CUSTOMPATH : '"esan"',
})

'use strict'

const express = require('express')
const router = express.Router({})

const IndexController = require('./api/indexController')

router.get('/get-data', IndexController.getData)

module.exports = router

const express = require('express')
const router = express.Router()

const {sayHi} = require('../controllers/sampleControllers')

router.get('/',sayHi)

module.exports=router
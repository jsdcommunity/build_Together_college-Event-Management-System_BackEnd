const express = require('express')
const router = express.Router()

const {admin} = require('../controllers/adminControllers')

router.get('/',admin)

module.exports=router;
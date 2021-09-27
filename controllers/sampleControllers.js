const User = require('../models/user')


exports.sayHi = (req,res,next)=>{
    res.status(200).json({
      success:true,
      message:'hello'
    })
}

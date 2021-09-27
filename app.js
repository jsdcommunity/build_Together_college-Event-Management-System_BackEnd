const express = require('express')
const app = express()   
const cookieParser = require('cookie-parser')
const dotenv= require('dotenv')
const connectDatabase = require('./config/dataBase')

dotenv.config({path:'./config/config.env'})
app.use(express.json())
app.use(cookieParser())


// Db connection
connectDatabase()

// Import all routes
const sample = require('./routes/sample')

app.use('/api/v1',sample)



// Server
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server start on port ${PORT}  in ${process.env.NODE_ENV} mode`)

})


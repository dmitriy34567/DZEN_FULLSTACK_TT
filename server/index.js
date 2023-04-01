require('dotenv').config()
const express = require('express');
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleWare')
const path = require('path')

const PORT = 5000

const app = express()
app.use(cors())
app.use(express.json())
//app.use(fileUpload({}))
//app.use(express.static(path.join(__dirname +'../uploads')))
app.use('/api', router)
app.use(errorHandler)



const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('server started on port', PORT))

        
    } catch (e) {
        console.log(e)
    }    
    
}
start()



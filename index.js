require('dotenv').config()

const express = require('express')
const cors = require('cors')
const ratelimit = require('express-rate-limit')
const helmet = require('helmet')
const path = require('path')
const httpContext = require('express-http-context')
const fs = require('fs')
const bodyParser = require('body-parser')
const { create } = require('domain')
const short_uuid = require('short-uuid')
const multer = require('multer')
const cloudinary = require('cloudinary').v2;

const { debug } = require('./src/config/debug')
const { onTestDatabase } = require('./src/db/connect_db')
const { createApi } = require('./src/api')
const app = express()
const forms = multer()

/*SETTING */
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }))
// app.use(forms.array());
app.use(bodyParser.json({ limit: '500mb' }))
// app.use(express.urlencoded({ extended: false }))

app.use(httpContext.middleware)
app.use((req, res, next) => {
    httpContext.set('request_id', short_uuid().new())
    next()
})

app.use(cors({ origin: true }))

const limiter = ratelimit({
    windowMs: 60 * 1000,
    max: 200
})

app.use(limiter)

/* Database */
onTestDatabase()

/* config mornitor */
// app.use('/api/v1/health',async(req,res)=>{
//     try {

//     } catch (error) {

//     }
// })

cloudinary.config({ cloud_name: process.env.CLOUD_NAME, api_key: process.env.CLOUD_API_KEY, api_secret: process.env.CLOUD_SECRET_KEY })

/* Debuging */
app.use((req, res, next) => {
    debug(`api is called %O`, req.originalUrl)
    next()
})

app.use('/api/v1/static', express.static(path.join(__dirname, './public')))
createApi(app)



app.get('/', (req, res) => {
    return res.send('hello world test')
})

// app.get('/api/v1/fefu/test', (req, res) => {
//     return res.status(200).json({ success: true })
// })

app.listen(process.env.PORT || 8000, () => {
    debug(`Server is running port ${process.env.PORT}`)
})
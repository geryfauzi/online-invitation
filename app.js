//Initiate the NodeJS Module
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const session = require('cookie-session')

app.use(session({
    name: "mames",
    keys: ["sjcK9YqAisA3Ef5H7bDGtQFh9MYE7nEpaL"],
    maxAge: 24 * 60 * 60 * 1000 * 720
}))

// upload
app.use(fileUpload())

//Security
app.disable('x-powered-by')

//load body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//load static file
const staticOptions = {
    setHeaders: function (res, path, stat) {
        res.set('Service-Worker-Allowed', '/')
    },
}
app.use('/assets', express.static('public', staticOptions),)

//load middleware
app.use(require('./middleware/ejs_default'))

//load template engine
app.engine('.html', require('ejs').__express)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

require('./routes')(app)

module.exports = app

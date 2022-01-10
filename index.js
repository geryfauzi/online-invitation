const http = require('http')
const port = 3000
const app = require('./app')

http.createServer(app).listen(port, () => {
    console.log("Listening to the port " + port)
})
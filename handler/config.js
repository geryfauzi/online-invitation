const mysql = require('mysql')

const config = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'kawin_lari',
    timezone : 'UTC'
})

module.exports = {
    config
}
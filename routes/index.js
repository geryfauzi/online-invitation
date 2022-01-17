module.exports = (app) => {
    app.use('/', require('./web'))
    app.use('/wo', require('./wo'))
    app.use('/api', require('./api'))
    //404
    app.use((req, res) => {
        return res.render('404', {title: "404 Not Found :("})
    })
}
module.exports = (req,res,next) => {
    res.locals.title = "Online Invitation"
    next()
}
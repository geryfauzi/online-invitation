const express = require("express")
const router = express.Router()
const WO = require('../handler/wo')
const Upload = require('../upload')
const Pernikahan = require('../handler/pernikahan')

//Area WO
router.post('/wo/login', WO.login)

//Other Area
router.post('/upload-image', Upload.uploadImage)

//Area Pernikahan
router.post('/pernikahan', Pernikahan.insertPernikahan)

module.exports = router
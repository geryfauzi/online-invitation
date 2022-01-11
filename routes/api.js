const express = require("express")
const router = express.Router()
const WO = require('../handler/wo')
const Upload = require('../upload')
const Pernikahan = require('../handler/pernikahan')
const Sesi = require('../handler/sesi')

//Area WO
router.post('/wo/login', WO.login)

//Other Area
router.post('/upload-image', Upload.uploadImage)

//Area Pernikahan
router.post('/pernikahan', Pernikahan.insertPernikahan)
router.get('/pernikahan/:id', Pernikahan.getOnePernikahan)
router.put('/pernikahan', Pernikahan.updatePernikahan)

//Area Sesi
router.post('/sesi', Sesi.insertSession)
router.get('/sesi/:id', Sesi.getWeddingSession)
router.put('/sesi', Sesi.updateSession)

module.exports = router
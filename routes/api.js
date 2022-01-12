const express = require("express")
const router = express.Router()
const WO = require('../handler/wo')
const Upload = require('../upload')
const Pernikahan = require('../handler/pernikahan')
const Sesi = require('../handler/sesi')
const Tamu = require('../handler/tamu')
const Gallery = require('../handler/gallery')

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
router.get('/sesi/detail/:id', Sesi.getDetailWeddingSession)
router.put('/sesi', Sesi.updateSession)

//Area Tamu
router.get('/tamu/:id', Tamu.getWeddingGuest)
router.post('/tamu', Tamu.insertGuest)
router.put('/tamu', Tamu.updateGuest)

//Area Gallery
router.post('/gallery', Gallery.insertGallery)
router.get('/gallery/:id', Gallery.getWeddingGallery)
router.delete('/gallery',Gallery.deleteWeddingGallery)

module.exports = router
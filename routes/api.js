const express = require("express")
const router = express.Router()
const WO = require('../handler/wo')
const Upload = require('../upload')
const Pernikahan = require('../handler/pernikahan')
const Sesi = require('../handler/sesi')
const Tamu = require('../handler/tamu')
const Gallery = require('../handler/gallery')
const Group = require('../handler/grup')
const Story = require('../handler/story')

//Area WO
router.post('/wo/login', WO.login)

//Area Story
router.get('/story/:id', Story.getStory)
router.post('/story', Story.insertStory)
router.put('/story', Story.updateStory)

//Other Area
router.post('/upload-image', Upload.uploadImage)
router.post('/upload-excel', Upload.uploadExcel)

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
router.post('/tamu/excel', Tamu.insertFromExcel)
router.get('/tamu/buku/:id', Tamu.getGuestBook)
router.post('/tamu/kode', Tamu.checkCode)
router.put('/tamu/rsvp', Tamu.updateRSVP)
router.get('/tamu/ucapan/:id', Tamu.getUcapan)

//Area Gallery
router.post('/gallery', Gallery.insertGallery)
router.get('/gallery/:id', Gallery.getWeddingGallery)
router.delete('/gallery', Gallery.deleteWeddingGallery)

//Area Group
router.post('/grup', Group.insertGroup)
router.get('/grup/:id', Group.getWeddingGroup)
router.put('/grup', Group.updateGroup)

module.exports = router
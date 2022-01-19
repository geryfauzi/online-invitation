const DB = require('./config')

const insertSession = async (req, res) => {
    let connect = DB.config
    let data = req.body
    //Insert ke database
    try {
        connect.query("INSERT INTO sesi VALUES(?,?,?,?,?,?,?,?)", [data.id, data.id_pernikahan, data.nama_sesi, data.tanggal, data.waktu_mulai, data.waktu_selesai, data.alamat, data.url_gmaps], (error, result) => {
            if (!error)
                return res.json({code: 1, message: "Berhasil menambahkan data sesi!"})
            else
                return res.json({code: 0, message: "Terjadi kesalahan saat menyimpan data sesi!"})
        })
    } catch (e) {
        console.log(e)
        return res.json({
            code: 0,
            message: "Terjadi kesalahan!"
        })
    }
}

const updateSession = async (req, res) => {
    let connect = DB.config
    let data = req.body
    //Insert ke database
    try {
        connect.query("UPDATE sesi SET nama_sesi = ?, tanggal = ?, waktu_mulai = ?, waktu_selesai = ?, alamat = ?, url_gmaps = ? WHERE id = ?", [data.nama_sesi, data.tanggal, data.waktu_mulai, data.waktu_selesai, data.alamat, data.url_gmaps, data.id], (error, result) => {
            if (!error)
                return res.json({code: 1, message: "Berhasil memperbarui data sesi!"})
            else
                return res.json({code: 0, message: "Terjadi kesalahan saat memperbarui data sesi!"})
        })
    } catch (e) {
        console.log(e)
        return res.json({
            code: 0,
            message: "Terjadi kesalahan!"
        })
    }
}

const getWeddingSession = async (req, res) => {
    let connect = DB.config
    let id = req.params.id
    try {
        connect.query("SELECT * FROM sesi WHERE id_pernikahan = ? ORDER BY tanggal ASC", [id], (error, result) => {
            return res.json({
                data: result
            })
        })
    } catch (e) {
        console.log(e)
    }
}

const getDetailWeddingSession = async (req, res) => {
    let connect = DB.config
    let id = req.params.id
    try {
        connect.query("SELECT * FROM detail_sesi WHERE id_tamu = ? ORDER BY id_sesi ASC", [id], (error, result) => {
            return res.json({
                data: result
            })
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getWeddingSession,
    insertSession,
    updateSession,
    getDetailWeddingSession
}
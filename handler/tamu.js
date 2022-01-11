const DB = require('./config')

const getWeddingGuest = async (req, res) => {
    let connect = DB.config
    let id = req.params.id
    try {
        connect.query("SELECT tamu.id, tamu.id_sesi, tamu.nama, tamu.telepon, tamu.jumlah, tamu.jenis_tamu,tamu.rsvp, tamu.kehadiran, tamu.id_pernikahan, tamu.kode, tamu.is_vip, tamu.ucapan, sesi.nama_sesi FROM tamu LEFT JOIN sesi ON tamu.id_sesi = sesi.id WHERE tamu.id_pernikahan = ?", [id], (error, result) => {
            console.log(result)
            return res.json({
                data: result
            })
        })
    } catch (e) {
        console.log(e)
    }
}

const insertGuest = async (req, res) => {
    let connect = DB.config
    let data = req.body
    try {
        connect.query("INSERT INTO tamu(id_sesi,nama,telepon,jumlah,jenis_tamu,id_pernikahan,kode,is_vip) VALUES(?,?,?,?,?,?,?,?)", [data.id_sesi, data.nama, data.telepon, data.jumlah, data.jenis_tamu, data.id_pernikahan, data.kode, data.is_vip], (error, result) => {
            if (!error)
                return res.json({
                    code: 1,
                    message: "Berhasil menambahkan tamu ke database!"
                })
            else
                return res.json({
                    code: 0,
                    message: "Terjadi kesalahan saat menambahkan data tamu!"
                })
        })
    } catch (e) {
        console.log(e)
        return res.json({
            code: 0,
            message: "Telah terjadi kesalahan!"
        })
    }
}

const updateGuest = async (req, res) => {
    let connect = DB.config
    let data = req.body
    try {
        connect.query("UPDATE tamu SET nama = ?, telepon = ?, jumlah = ?, jenis_tamu = ?, id_sesi = ?, is_vip = ? WHERE id = ?", [data.nama, data.telepon, data.jumlah, data.jenis_tamu, data.id_sesi, data.is_vip, data.id], (error, result) => {
            if(!error)
                return res.json({
                    code : 1,
                    message : "Berhasil memperbarui data tamu!"
                })
            else
                return res.json({
                    code : 0,
                    message : "Terjadi kesalahan saat memperbarui data tamu!"
                })
        })
    }catch (e) {
        console.log(e)
        return res.json({
            code : 0,
            message : "Terjadi kesalahan!"
        })
    }
}

module.exports = {
    getWeddingGuest,
    insertGuest,
    updateGuest
}
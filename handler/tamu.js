const DB = require('./config')

const getWeddingGuest = async (req, res) => {
    let connect = DB.config
    let id = req.params.id
    try {
        connect.query("SELECT tamu.id, tamu.nama, tamu.telepon, tamu.jumlah, tamu.jenis_tamu, tamu.rsvp, tamu.kehadiran, tamu.id_pernikahan, tamu.kode, tamu.is_vip, tamu.is_family, tamu.ucapan, COUNT(detail_sesi.id_sesi) AS jumlah_sesi FROM tamu LEFT JOIN detail_sesi ON tamu.id = detail_sesi.id_tamu WHERE tamu.id_pernikahan = ? GROUP BY tamu.id ORDER BY tamu.id DESC", [id], (error, result) => {
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
        connect.query("INSERT INTO tamu(nama,telepon,jumlah,jenis_tamu,id_pernikahan,kode,is_vip,is_family) VALUES(?,?,?,?,?,?,?,?)", [data.nama, data.telepon, data.jumlah, data.jenis_tamu, data.id_pernikahan, data.kode, data.is_vip, data.is_family], (error, result) => {
            if (!error) {
                data.sesi.forEach(item => {
                    connect.query("INSERT INTO detail_sesi VALUES(?,?)", [item, result.insertId], (error1, result1) => {
                    })
                })
                return res.json({
                    code: 1,
                    message: "Berhasil menambahkan tamu ke database!"
                })
            } else {
                console.log(error)
                return res.json({
                    code: 0,
                    message: "Terjadi kesalahan saat menambahkan data tamu!"
                })
            }
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
        connect.query("UPDATE tamu SET nama = ?, telepon = ?, jumlah = ?, jenis_tamu = ?, is_family = ?, is_vip = ? WHERE id = ?", [data.nama, data.telepon, data.jumlah, data.jenis_tamu, data.is_family, data.is_vip, data.id], (error, result) => {
            if (!error) {
                data.sesi.forEach(item => {
                    connect.query("DELETE FROM detail_sesi WHERE id_sesi = ? AND id_tamu = ?", [item, data.id], (error1, result1) => {
                    })
                })
                data.sesi.forEach(item => {
                    connect.query("INSERT INTO detail_sesi VALUES(?,?)", [item, data.id], (error1, result1) => {
                    })
                })
                return res.json({
                    code: 1,
                    message: "Berhasil memperbarui data tamu!"
                })
            } else
                return res.json({
                    code: 0,
                    message: "Terjadi kesalahan saat memperbarui data tamu!"
                })
        })
    } catch (e) {
        console.log(e)
        return res.json({
            code: 0,
            message: "Terjadi kesalahan!"
        })
    }
}

module.exports = {
    getWeddingGuest,
    insertGuest,
    updateGuest
}
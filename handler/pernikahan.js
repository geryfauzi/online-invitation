const DB = require('./config')

const insertPernikahan = async (req, res) => {
    let connect = DB.config
    let data = req.body
    console.log(data)
    try {
        connect.query("INSERT INTO pernikahan(id,id_wo,nama,tanggal,quote_cover,quote_body,image_cover,image_cover_potrait) VALUES(?,?,?,?,?,?,?,?)",
            [data.id, data.id_wo, data.nama, data.tanggal, data.quote_cover, data.quote_body, data.image_cover, data.image_cover_potrait], (error, result) => {
            if (!error)
                return res.json({
                    code: 1,
                    message: "Berhasil menyimpan data pernikahan ke basis data!",
                    id: data.id
                })
            else {
                console.log(error)
                return res.json({
                    code: 0,
                    message: "Terjadi kesalahan!"
                })
            }
        })
    } catch (e) {
        console.log(e)
    }
}

const updatePernikahan = async (req, res) => {
    let connect = DB.config
    let data = req.body
    console.log(data)
    try {
        connect.query("UPDATE pernikahan SET nama = ?, tanggal = ?, nama_calon1 = ?, ortu_calon1 = ?, nama_calon2 = ?, ortu_calon2 = ?, image_calon1 = ?, image_calon2 = ?, quote_cover = ?, quote_body = ?, image_cover = ?, image_cover_potrait = ?, switch_gallery = ?, switch_story = ?, template = ?, url_livestreaming = ?, switch_streaming = ?, angpau_qr = ?, switch_angpau = ?, angpau_rek_bank = ?, angpau_rek_nomor = ?, angpau_rek_nama = ?, switch_bank = ?, alamat_kado = ?, switch_kado = ? WHERE id = ?",
            [data.nama, data.tanggal, data.nama_calon1, data.ortu_calon1, data.nama_calon2, data.ortu_calon2, data.image_calon1,data.image_calon2, data.quote_cover, data.quote_body, data.image_cover, data.image_cover_potrait, data.switch_gallery, data.switch_story, data.template, data.url_livestreaming, data.switch_streaming, data.angpau_qr, data.switch_angpau, data.angpau_rek_bank, data.angpau_rek_nomor, data.angpau_rek_nama, data.switch_bank, data.alamat_kado, data.switch_kado,  data.id],
            (error, result) => {
                if (!error)
                    return res.json({
                        code: 1,
                        message: "Berhasil memperbarui data pernikahan!"
                    })
                else {
                    console.log(error.message)
                    return res.json({
                        code: 0,
                        message: "Terjadi kesalahan saat memperbarui data!"
                    })
                }
            })
    } catch (e) {
        console.log(e)
    }
}

const getOnePernikahan = async (req, res) => {
    let connect = DB.config
    let id = req.params.id
    try {
        connect.query("SELECT * FROM pernikahan WHERE id = ?", [id], (error, result) => {
            return res.json({
                data: result
            })
        })
    } catch (e) {
        console.log(e)
    }
}

const getAllPernikahan = async (req, res) => {
    let connect = DB.config
    try {
        connect.query("SELECT * FROM pernikahan ORDER BY tanggal DESC", (error, result) => {
            return res.json({
                code: 1,
                data: result
            })
        })
    } catch (e) {
        console.log(e)
        return res.json({code: 0, message: "Terjadi kesalahan!"})
    }
}

const deletePernikahn = async (req, res) => {
    let connect = DB.config
    let {id} = req.body
    try {
        connect.query("DELETE FROM pernikahan WHERE id = ?", [id], (error, result) => {
            if (!error)
                return res.json({code: 1, message: "Berhasil menghapus data pernikahan!"})
            else
                return res.json({code: 0, message: "Terjadi kesalahan!"})
        })
    } catch (e) {
        console.log(e)
    }
}

const getAngpau = async (req, res) => {
    let connect = DB.config
    let {id} = req.params
    try {
        connect.query("SELECT id AS id_pernikahan, angpau_qr, angpau_rek_bank, angpau_rek_nomor, angpau_rek_nama FROM pernikahan WHERE id = ?", [id], (error, result) => {
            return res.json({data: result[0]})
        })
    } catch (e) {
        console.log(e)
    }
}

const uploadQRAngpau = async (req, res) => {
    let connect = DB.config
    let data = req.body
    try {
        connect.query("UPDATE pernikahan SET angpau_qr = ? WHERE id = ?", [data.angpau_qr, data.id_pernikahan], (error, result) => {
            if (!error)
                return res.json({code: 1, message: "Berhasil mengupload gambar QR angpau!"})
            else
                return res.json({code: 0, message: "Terjadi kesalahan!"})
        })
    } catch (e) {
        console.log(e)
    }
}

const updateRekeningAngpau = async (req, res) => {
    let connect = DB.config
    let data = req.body
    try {
        connect.query("UPDATE pernikahan SET angpau_rek_bank = ?, angpau_rek_nomor = ?, angpau_rek_nama = ? WHERE id = ?",
            [data.angpau_rek_bank, data.angpau_rek_nomor, data.angpau_rek_nama, data.id_pernikahan], (error, result) => {
                if (!error)
                    return res.json({code: 1, message: "Berhasil memperbarui data rekening untuk angpau!"})
                else
                    return res.json({code: 0, message: "Terjadi kesalahan!"})
            })
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    insertPernikahan,
    getOnePernikahan,
    updatePernikahan,
    getAllPernikahan,
    deletePernikahn,
    uploadQRAngpau,
    getAngpau,
    updateRekeningAngpau
}

const DB = require('./config')

const insertPernikahan = async (req, res) => {
    let connect = DB.config
    let data = req.body
    console.log(data)
    try {
        connect.query("INSERT INTO pernikahan(id,id_wo,nama,tanggal,quote_cover,image_cover) VALUES(?,?,?,?,?,?)", [data.id, data.id_wo, data.nama, data.tanggal, data.quote_cover, data.image_cover], (error, result) => {
            if (!error)
                return res.json({
                    code: 1,
                    message: "Berhasil menyimpan data pernikahan ke basis data!",
                    id: data.id
                })
            else
                return res.json({
                    code: 0,
                    message: "Terjadi kesalahan!"
                })
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
        connect.query("UPDATE pernikahan SET nama = ?, tanggal = ?, nama_cpp = ?, ayah_cpp = ?, ibu_cpp = ?, nama_cpw = ?, ayah_cpw = ?, ibu_cpw = ?, image_cpp = ?, image_cpw = ?, quote_cover = ?, image_cover = ?, template = ? WHERE id = ?", [data.nama, data.tanggal, data.nama_cpp, data.ayah_cpp, data.ibu_cpp, data.nama_cpw, data.ayah_cpw, data.ibu_cpw, data.image_cpp, data.image_cpw, data.quote_cover, data.image_cover, data.template, data.id], (error, result) => {
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
            if(!error)
                return res.json({code :1, message : "Berhasil menghapus data pernikahan!"})
            else
                return res.json({code :0, message : "Terjadi kesalahan!"})
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
    deletePernikahn
}
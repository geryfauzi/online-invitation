const DB = require('./config')
const fs = require('fs')

const deleteWeddingGallery = async (req,res) => {
    let connect = DB.config
    let data = req.body
    let path = `./public/uploads/${data.image}`
    fs.unlink(path,(error) => {
        if(!error){
            connect.query("DELETE FROM gallery WHERE id = ?",[data.id], (err,result) => {
                if(!err)
                    return res.json({
                        code : 1,
                        message : "Berhasil menghapus file!"
                    })
                else {
                    console.log(err)
                    return res.json({
                        code : 0,
                        message : "Terjadi kesalahan saat mengahpus file dari database!"
                    })
                }
            })
        }
        else{
            console.log(error)
            return res.json({
                code : 0,
                message : "Terjadi kesalahan saat menghapus file dari direktori server!"
            })
        }
    })
}

const getWeddingGallery = async (req, res) => {
    let connect = DB.config
    let id = req.params.id
    try {
        connect.query("SELECT * FROM gallery WHERE id_pernikahan = ?", [id], (error, result) => {
            return res.json({
                data: result
            })
        })
    } catch (e) {
        console.log(e)
    }
}

const insertGallery = async (req, res) => {
    let connect = DB.config
    let data = req.body
    try {
        connect.query("INSERT INTO gallery VALUES(?,?,?,?)", [data.id, data.id_pernikahan, data.image, data.keterangan], (error, result) => {
            if (!error)
                return res.json({
                    code: 1,
                    message: "Berhasil menambahkan foto ke gallery!"
                })
            else {
                console.log(error)
                return res.json({
                    code: 0,
                    message: "Terjadi kesalahan saat menambahkan foto!"
                })
            }
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
    insertGallery,
    getWeddingGallery,
    deleteWeddingGallery
}
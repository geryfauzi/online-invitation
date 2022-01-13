const DB = require('./config')

const insertGroup = async (req, res) => {
    let connect = DB.config
    let data = req.body
    try {
        connect.query("INSERT INTO grup VALUES(?,?,?)", [data.id, data.id_pernikahan, data.nama], (error, result) => {
            if (!error)
                return res.json({
                    code: 1,
                    message: "Berhasil menambahkan grup!"
                })
            else {
                console.log(error)
                return res.json({
                    code: 0,
                    message: "Terjadi kesalahan saat menambahkan grup!"
                })
            }
        })
    } catch (e) {
        console.log(e)
    }
}

const getWeddingGroup = async (req, res) => {
    let connect = DB.config
    let id = req.params.id
    try {
        connect.query("SELECT * FROM grup WHERE id_pernikahan = ?", [id], (error, result) => {
            return res.json({
                data: result
            })
        })
    } catch (e) {
        console.log(e)
    }
}

const updateGroup = async (req, res) => {
    let connect = DB.config
    let data = req.body
    try {
        connect.query("UPDATE grup SET nama = ? WHERE id = ?", [data.nama, data.id], (error, result) => {
            if (!error)
                return res.json({
                    code: 1,
                    message: "Berhasil memperbarui data grup!"
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

module.exports = {
    getWeddingGroup,
    insertGroup,
    updateGroup
}
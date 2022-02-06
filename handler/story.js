const DB = require('./config')

const getStory = async (req, res) => {
    let id = req.params.id
    let connect = DB.config
    try {
        connect.query("SELECT * FROM story WHERE id_pernikahan = ? ORDER BY tahun DESC", [id], (error, result) => {
            return res.json({
                data: result
            })
        })
    } catch (e) {
        console.log(e)
    }
}

const insertStory = async (req, res) => {
    let data = req.body
    let connect = DB.config
    try {
        //Pengecekan Tahun
        connect.query("SELECT * FROM story WHERE id_pernikahan = ? AND tahun = ?", [data.id_pernikahan, data.tahun], (error, result) => {
            if (result.length > 0)
                return res.json({
                    code: 0,
                    message: "Maaf, tahun sudah ada dalam database!"
                })
            else {
                //Insert ke database
                connect.query("INSERT INTO story VALUES(?,?,?,?)", [data.id, data.id_pernikahan, data.tahun, data.story], (error1, result1) => {
                    if (!error1)
                        return res.json({code: 1, message: "Berhasil memasukkan data ke dalam database!"})
                    else {
                        console.log(error1)
                        return res.json({code: 0, message: "Terjadi kesalahan!"})
                    }
                })
            }
        })
    } catch (e) {
        console.log(e)
    }
}

const updateStory = async (req, res) => {
    let data = req.body
    let connect = DB.config
    try {
        //Pengecekan Tahun
        connect.query("SELECT * FROM story WHERE id_pernikahan = ? AND tahun = ? AND id != ?", [data.id_pernikahan, data.tahun, data.id], (error, result) => {
            if (result.length > 0)
                return res.json({
                    code: 0,
                    message: "Maaf, tahun sudah ada dalam database!"
                })
            else {
                //Insert ke database
                connect.query("UPDATE story SET tahun = ?, story = ? WHERE id = ?", [data.tahun, data.story, data.id], (error1, result1) => {
                    if (!error1)
                        return res.json({code: 1, message: "Berhasil menyimpan pembaruan ke dalam database!"})
                    else {
                        console.log(error1)
                        return res.json({code: 0, message: "Terjadi kesalahan!"})
                    }
                })
            }
        })
    } catch (e) {
        console.log(e)
    }
}

const deleteStory = async (req, res) => {
    let connect = DB.config
    let {id} = req.body
    try {
        connect.query("DELETE FROM story WHERE id = ?", [id], (error, result) => {
            if (!error)
                return res.json({code: 1, message: "Berhasil menghapus story!"})
            else
                return res.json({code: 0, message: "Terjadi kesalahan!"})
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getStory,
    insertStory,
    updateStory,
    deleteStory
}
const DB = require('./config')
const fs = require('fs')
const excel = require('read-excel-file/node')
const path = require('path')

function generateCode() {
    let text = "";
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i <= 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

const getWeddingGuest = async (req, res) => {
    let connect = DB.config
    let id = req.params.id
    try {
        connect.query("SELECT tamu.id, tamu.id_grup, grup.nama AS nama_grup, tamu.nama, tamu.telepon, tamu.jumlah,tamu.rsvp, tamu.kehadiran, tamu.id_pernikahan, tamu.kode, tamu.is_vip, tamu.is_family, tamu.ucapan, COUNT(detail_sesi.id_sesi) AS jumlah_sesi FROM tamu LEFT JOIN detail_sesi ON tamu.id = detail_sesi.id_tamu LEFT JOIN grup ON tamu.id_grup = grup.id WHERE tamu.id_pernikahan = ? GROUP BY tamu.id ORDER BY tamu.id DESC", [id], (error, result) => {
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
        connect.query("INSERT INTO tamu(nama,telepon,jumlah,id_pernikahan,id_grup,kode,is_vip,is_family) VALUES(?,?,?,?,?,?,?,?)", [data.nama, data.telepon, data.jumlah, data.id_pernikahan, data.id_grup, data.kode, data.is_vip, data.is_family], (error, result) => {
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

const insertFromExcel = async (req, res) => {
    let connect = DB.config
    let data = req.body
    let filePath = path.join(__dirname + '/../public/uploads/excel/' + data.excel)
    console.log(filePath)
    try {
        let isError = false
        //Pertama, insert ke tabel tamu dulu dari data ms excel
        excel(filePath).then((rows) => {
            rows.shift()
            rows.forEach((item) => {
                connect.query("INSERT INTO tamu(nama,telepon,jumlah,id_grup,id_pernikahan,kode,is_vip,is_family) VALUES(?,?,?,?,?,?,?,?)", [
                    item[0],
                    item[1],
                    item[2],
                    item[3],
                    data.id_pernikahan,
                    generateCode(),
                    item[4],
                    item[5]
                ], (error, result) => {
                    if (!error) {
                        //Insert data sesi
                        let sesi = item[6]
                        connect.query("INSERT INTO detail_sesi VALUES(?,?)", [sesi, result.insertId], (error1, result1) => {
                            if (error1) {
                                console.log(error1)
                                isError = true
                            }
                        })
                        fs.unlink(filePath, (error) => {
                        })
                    } else
                        isError = true
                })
            })
            if (!isError)
                return res.json({
                    code: 1,
                    message: "Berhasil menambahkan tamu!"
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

const updateGuest = async (req, res) => {
    let connect = DB.config
    let data = req.body
    try {
        connect.query("UPDATE tamu SET nama = ?, telepon = ?, jumlah = ?, id_grup = ?, is_family = ?, is_vip = ? WHERE id = ?", [data.nama, data.telepon, data.jumlah, data.id_grup, data.is_family, data.is_vip, data.id], (error, result) => {
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
    updateGuest,
    insertFromExcel
}
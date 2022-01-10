const DB = require('./config')

const insertPernikahan = async (req,res) => {
    let connect = DB.config
    let data = req.body
    try{
        connect.query("INSERT INTO pernikahan(id,id_wo,nama,tanggal,quote_cover,image_cover,alamat,url_gmaps) VALUES(?,?,?,?,?,?,?,?)",[data.id,data.id_wo,data.nama,data.tanggal,data.quote_cover,data.image_cover,data.alamat,data.url_gmaps],(error,result) => {
            if(!error)
                return res.json({
                    code : 1,
                    message : "Berhasil menyimpan data pernikahan ke basis data!",
                    id : data.id
                })
            else
                return res.json({
                    code : 0,
                    message : "Terjadi kesalahan!"
                })
        })
    }catch (e) {
        console.log(e)
    }
}

module.exports = {
    insertPernikahan
}
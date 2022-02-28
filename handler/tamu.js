const DB = require("./config");
const fs = require("fs");
const excel = require("read-excel-file/node");
const path = require("path");

function generateCode() {
    let text = "";
    let possible = "0123456789";
    for (let i = 0; i <= 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

const getWeddingGuest = async (req, res) => {
    let connect = DB.config;
    let id = req.params.id;
    try {
        connect.query(
            "SELECT tamu.id, tamu.id_grup, grup.nama AS nama_grup, tamu.nama, tamu.telepon, tamu.jumlah_dewasa, tamu.jumlah_anak, tamu.rsvp, tamu.kehadiran, tamu.id_pernikahan, tamu.kode, tamu.is_vip, tamu.is_family, tamu.is_special, tamu.ucapan, COUNT(detail_sesi.id_sesi) AS jumlah_sesi FROM tamu LEFT JOIN detail_sesi ON tamu.id = detail_sesi.id_tamu LEFT JOIN grup ON tamu.id_grup = grup.id WHERE tamu.id_pernikahan = ? GROUP BY tamu.id ORDER BY tamu.id DESC",
            [id],
            (error, result) => {
                console.log(result);
                return res.json({
                    data: result,
                });
            }
        );
    } catch (e) {
        console.log(e);
    }
};

const insertGuest = async (req, res) => {
    let connect = DB.config;
    let data = req.body;
    try {
        connect.query(
            "INSERT INTO tamu(nama,telepon,jumlah_dewasa,jumlah_anak,id_pernikahan,id_grup,kode,is_vip,is_family,is_special) VALUES(?,?,?,?,?,?,?,?,?,?)",
            [data.nama, data.telepon, data.jumlah_dewasa, data.jumlah_anak, data.id_pernikahan, data.id_grup, data.kode, data.is_vip, data.is_family, data.is_special],
            (error, result) => {
                if (!error) {
                    data.sesi.forEach((item) => {
                        connect.query("INSERT INTO detail_sesi VALUES(?,?)", [item, result.insertId], (error1, result1) => {
                        });
                    });
                    return res.json({
                        code: 1,
                        message: "Berhasil menambahkan tamu ke database!",
                    });
                } else {
                    console.log(error);
                    return res.json({
                        code: 0,
                        message: "Terjadi kesalahan saat menambahkan data tamu!",
                    });
                }
            }
        );
    } catch (e) {
        console.log(e);
        return res.json({
            code: 0,
            message: "Telah terjadi kesalahan!",
        });
    }
};

const insertFromExcel = async (req, res) => {
    let connect = DB.config;
    let data = req.body;
    let filePath = path.join(__dirname + "/../public/uploads/excel/" + data.excel);
    console.log(filePath);
    try {
        let isError = false;
        //Pertama, insert ke tabel tamu dulu dari data ms excel
        excel(filePath).then((rows) => {
            rows.shift();
            rows.forEach((item) => {
                connect.query(
                    "INSERT INTO tamu(nama,telepon,jumlah_dewasa,jumlah_anak,id_grup,id_pernikahan,kode,is_vip,is_family) VALUES(?,?,?,?,?,?,?,?,?)",
                    [item[0], item[1], item[2], item[3], item[4], data.id_pernikahan, generateCode(), item[5], item[6]],
                    (error, result) => {
                        if (!error) {
                            //Insert data sesi
                            let sesi = item[7];
                            connect.query("INSERT INTO detail_sesi VALUES(?,?)", [sesi, result.insertId], (error1, result1) => {
                                if (error1) {
                                    console.log(error1);
                                    isError = true;
                                }
                            });
                            fs.unlink(filePath, (error) => {
                            });
                        } else isError = true;
                    }
                );
            });
            if (!isError)
                return res.json({
                    code: 1,
                    message: "Berhasil menambahkan tamu!",
                });
            else
                return res.json({
                    code: 0,
                    message: "Terjadi kesalahan!",
                });
        });
    } catch (e) {
        console.log(e);
    }
};

const updateGuest = async (req, res) => {
    let connect = DB.config;
    let data = req.body;
    try {
        connect.query(
            "UPDATE tamu SET nama = ?, telepon = ?, jumlah_dewasa = ?, jumlah_anak = ?, id_grup = ?, is_family = ?, is_vip = ?, is_special = ? WHERE id = ?",
            [data.nama, data.telepon, data.jumlah_dewasa, data.jumlah_anak, data.id_grup, data.is_family, data.is_vip, data.is_special, data.id],
            (error, result) => {
                if (!error) {
                    data.sesi.forEach((item) => {
                        connect.query("DELETE FROM detail_sesi WHERE id_tamu = ?", [data.id], (error1, result1) => {
                        });
                    });
                    data.sesi.forEach((item) => {
                        connect.query("INSERT INTO detail_sesi VALUES(?,?)", [item, data.id], (error1, result1) => {
                        });
                    });
                    return res.json({
                        code: 1,
                        message: "Berhasil memperbarui data tamu!",
                    });
                } else
                    return res.json({
                        code: 0,
                        message: "Terjadi kesalahan saat memperbarui data tamu!",
                    });
            }
        );
    } catch (e) {
        console.log(e);
        return res.json({
            code: 0,
            message: "Terjadi kesalahan!",
        });
    }
};

const getGuestBook = async (req, res) => {
    let connect = DB.config;
    let id = req.params.id;
    try {
        connect.query(
            "SELECT tamu.ucapan, tamu.id, tamu.id_grup, grup.nama AS nama_grup, tamu.nama, tamu.telepon, tamu.jumlah_dewasa, tamu.jumlah_anak,tamu.rsvp, tamu.kehadiran, tamu.id_pernikahan, tamu.kode, tamu.is_vip, tamu.is_family, tamu.waktu_checkin, tamu.waktu_checkout FROM tamu LEFT JOIN detail_sesi ON tamu.id = detail_sesi.id_tamu LEFT JOIN grup ON tamu.id_grup = grup.id WHERE tamu.id_pernikahan = ? AND tamu.kehadiran != 'Belum Dikonfirmasi' GROUP BY tamu.id ORDER BY tamu.id DESC",
            [id],
            (error, result) => {
                return res.json({
                    data: result,
                });
            }
        );
    } catch (e) {
        console.log(e);
    }
};

const checkCode = async (req, res) => {
    let data = req.body;
    let connect = DB.config;
    connect.query("SELECT * FROM tamu WHERE kode = ? AND id_pernikahan = ?", [data.kode, data.id_pernikahan], (error, result) => {
        if (result.length > 0) {
            connect.query("SELECT * FROM tamu WHERE kode = ? AND id_pernikahan = ? AND rsvp = 'Belum Dikonfirmasi'", [data.kode, data.id_pernikahan], (error2, result2) => {
                if (result2.length > 0) {
                    connect.query(
                        "SELECT tamu.kode, detail_sesi.id_sesi, detail_sesi.id_tamu, sesi.nama_sesi, sesi.tanggal, sesi.waktu_mulai, sesi.waktu_selesai, sesi.alamat, sesi.url_gmaps FROM tamu JOIN detail_sesi ON tamu.id = detail_sesi.id_tamu JOIN sesi ON sesi.id = detail_sesi.id_sesi WHERE tamu.kode = ?",
                        [data.kode],
                        (error1, result1) => {
                            return res.json({code: 1, data: result[0], dataSesi: result1});
                        }
                    );
                } else {
                    connect.query(
                        "SELECT tamu.kode, detail_sesi.id_sesi, detail_sesi.id_tamu, sesi.nama_sesi, sesi.tanggal, sesi.waktu_mulai, sesi.waktu_selesai, sesi.alamat, sesi.url_gmaps FROM tamu JOIN detail_sesi ON tamu.id = detail_sesi.id_tamu JOIN sesi ON sesi.id = detail_sesi.id_sesi WHERE tamu.kode = ?",
                        [data.kode],
                        (error1, result1) => {
                            return res.json({
                                code: 2,
                                data: result[0],
                                dataSesi: result1,
                                message: "Kode undangan sudah diisi, silahkan hubungi pengantin jika ingin merubah kehadiran"
                            });
                        }
                    );
                }//endif
            })
        } else return res.json({code: 0, message: "Kode undangan tidak valid! Silahkan coba lagi."});
    });
};

const updateRSVP = async (req, res) => {
    let data = req.body;
    let connect = DB.config;
    try {
        connect.query(
            "UPDATE tamu SET nama = ?, telepon = ?, jumlah_dewasa = ?, jumlah_anak = ?, alasan = ?, ucapan = ?, rsvp = ? WHERE kode = ?",
            [data.nama, data.telepon, data.jumlah_dewasa, data.jumlah_anak, data.alasan, data.ucapan, data.rsvp, data.kode],
            (error, result) => {
                if (!error) {
                    connect.query(
                        "SELECT tamu.kode, detail_sesi.id_sesi, detail_sesi.id_tamu, sesi.nama_sesi, sesi.tanggal, sesi.waktu_mulai, sesi.waktu_selesai FROM tamu JOIN detail_sesi ON tamu.id = detail_sesi.id_tamu JOIN sesi ON sesi.id = detail_sesi.id_sesi WHERE tamu.kode = ?",
                        [data.kode],
                        (error1, result1) => {
                            return res.json({code: 1, message: "Berhasil memperbarui RSVP!", data: result1});
                        }
                    );
                } else {
                    console.log(error);
                    return res.json({code: 0, message: "Terjadi kesalahan saat memperbarui RSVP!"});
                }
            }
        );
    } catch (e) {
        console.log(e);
    }
};

const getUcapan = async (req, res) => {
    let connect = DB.config;
    let id = req.params.id;
    try {
        connect.query("SELECT * FROM tamu WHERE id_pernikahan = ? AND ucapan IS NOT NULL", [id], (error, result) => {
            return res.json({
                data: result,
            });
        });
    } catch (e) {
        console.log(e);
    }
};

const insertGuestBook = async (req, res) => {
    let connect = DB.config;
    let data = req.body;
    //Pengecekan untuk tamu yang cekin
    try {
        //Cek apakah kode valid
        connect.query("SELECT * FROM tamu WHERE kode = ? AND id_pernikahan = ?", [data.kode, data.id_pernikahan], (kesalahan, hasil) => {
            if (hasil.length <= 0) return res.json({code: 0, message: "Kode tamu ini tidak valid!"});
            else return res.json({code: 1, data: hasil[0]})
        });
    } catch (e) {
        console.log(e);
        return res.json({code: 0, message: "Terjadi kesalahan pada server!"});
    }
};

const checkIn = async (req, res) => {
    let connect = DB.config
    let data = req.body
    try {
        connect.query("UPDATE tamu SET nama = ?, kehadiran = ?, waktu_checkin = curtime(), pax_dewasa = ?, pax_anak = ?, id_grup = ?, is_vip = ?, is_family = ? WHERE id_pernikahan = ? AND kode = ?",
            [data.nama, data.kehadiran, data.jumlah_dewasa, data.jumlah_anak, data.id_grup, data.is_vip, data.is_family, data.id_pernikahan, data.kode], (error, result) => {
                if (!error)
                    return res.json({code: 1, message: "Berhasil menambahkan tamu!"})
                else {
                    console.log(error)
                    return res.json({code: 0, message: "Terjadi kesalahan!"})
                }
            })
    } catch (e) {
        console.log(e)
    }
}

const deleteGuest = async (req, res) => {
    let connect = DB.config;
    let {id} = req.body;
    try {
        connect.query("DELETE FROM tamu WHERE id = ?", [id], (error, result) => {
            if (!error) return res.json({code: 1, message: "Berhasil menghapus data tamu!"});
            else return res.json({code: 0, message: "Terjadi kesalahan!"});
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    getWeddingGuest,
    insertGuest,
    updateGuest,
    insertFromExcel,
    getGuestBook,
    checkCode,
    updateRSVP,
    getUcapan,
    insertGuestBook,
    deleteGuest,
    checkIn
};

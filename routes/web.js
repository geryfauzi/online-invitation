const express = require("express");
const router = express.Router();
const DB = require("../handler/config");

function formatDate(date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("");
}

function formatEndDate(date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + (d.getDate() + 1),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("");
}

router.get("/", (req, res) => {
    const title = "Undangan Pernikahan";
    return res.json({
        data: 'Hello World!',
        title
    });
});

router.get("/pernikahan/:id", (req, res) => {
    let connect = DB.config;
    let id = req.params.id;
    let tanggal = "tanggal";
    let tanggalSelesai = "tanggal";
    try {
        connect.query("SELECT * FROM pernikahan WHERE id = ?", [id], (error, result) => {
            console.log(result);
            if (!error && result.length > 0) {
                connect.query("SELECT * FROM gallery WHERE id_pernikahan = ?", [id], (error1, result1) => {
                    tanggal = formatDate(result[0].tanggal);
                    tanggalSelesai = formatEndDate(result[0].tanggal);
                    console.log(`${tanggal} / ${tanggalSelesai}`)
                    if (result[0].template === "1") {
                        return res.render("template1-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null),
                        });
                    } else if (result[0].template === "2") {
                        return res.render("template1-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "3") {
                        return res.render("template2-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "4") {
                        return res.render("template2-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "5") {
                        return res.render("template3-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "6") {
                        return res.render("template3-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "7") {
                        return res.render("template4-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "8") {
                        return res.render("template4-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "9") {
                        return res.render("template5-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "10") {
                        return res.render("template5-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "11") {
                        return res.render("template6-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "12") {
                        return res.render("template6-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "13") {
                        return res.render("template7-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else {
                        return res.render("template7-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    }
                });
            } else return res.render("404");
        });
    } catch (e) {
        console.log(e);
        return res.render("404");
    }
});

router.get("/pernikahan/:id/RSVP", (req, res) => {
    let connect = DB.config;
    let id = req.params.id;
    let tanggal = "tanggal";
    let kode = "kode";
    try {
        connect.query("SELECT * FROM pernikahan WHERE id = ?", [id], (error, result) => {
            if (!error && result.length > 0) {
                connect.query("SELECT * FROM gallery WHERE id_pernikahan = ?", [id], (error1, result1) => {
                    tanggal = formatDate(result[0].tanggal);
                    tanggalSelesai = formatEndDate(result[0].tanggal);
                    if (result[0].template === "1") {
                        return res.render("template1-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            kode,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "2") {
                        return res.render("template1-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            kode,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "3") {
                        return res.render("template2-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            kode,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "4") {
                        return res.render("template2-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            kode,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "5") {
                        return res.render("template3-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            kode,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "6") {
                        return res.render("template3-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            kode,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "7") {
                        return res.render("template4-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            kode,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "8") {
                        return res.render("template4-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            kode,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "9") {
                        return res.render("template5-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            kode,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "10") {
                        return res.render("template5-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            kode,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "11") {
                        return res.render("template6-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            kode,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "12") {
                        return res.render("template6-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            kode,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "13") {
                        return res.render("template7-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            kode,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else {
                        return res.render("template7-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            kode,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    }
                });
            } else return res.render("404");
        });
    } catch (e) {
        console.log(e);
        return res.render("404");
    }
});

router.get("/pernikahan/:id/RSVP/:nama", (req, res) => {
    let connect = DB.config;
    let id = req.params.id;
    let tanggal = "tanggal";
    let tanggalSelesai = "tanggal";
    let nama_tamu = req.params.nama
    nama_tamu = decodeURIComponent(nama_tamu)
    try {
        connect.query("SELECT * FROM pernikahan WHERE id = ?", [id], (error, result) => {
            console.log(result);
            if (!error && result.length > 0) {
                connect.query("SELECT * FROM gallery WHERE id_pernikahan = ?", [id], (error1, result1) => {
                    tanggal = formatDate(result[0].tanggal);
                    tanggalSelesai = formatEndDate(result[0].tanggal);
                    console.log(`${tanggal} / ${tanggalSelesai}`)
                    if (result[0].template === "1") {
                        return res.render("template1-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            nama_tamu,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null),
                        });
                    } else if (result[0].template === "2") {
                        return res.render("template1-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            nama_tamu,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "3") {
                        return res.render("template2-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            nama_tamu,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "4") {
                        return res.render("template2-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            nama_tamu,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "5") {
                        return res.render("template3-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            nama_tamu,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "6") {
                        return res.render("template3-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            nama_tamu,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "7") {
                        return res.render("template4-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            nama_tamu,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "8") {
                        return res.render("template4-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            nama_tamu,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "9") {
                        return res.render("template5-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            nama_tamu,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "10") {
                        return res.render("template5-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            nama_tamu,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "11") {
                        return res.render("template6-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            nama_tamu,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "12") {
                        return res.render("template6-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            nama_tamu,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else if (result[0].template === "13") {
                        return res.render("template7-ID", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            nama_tamu,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    } else {
                        return res.render("template7-EN", {
                            id: id,
                            data: result[0],
                            title: result[0].nama,
                            tanggal,
                            tanggalSelesai,
                            date: result[0].tanggal,
                            gallery: result1,
                            nama_tamu,
                            youtube: (result[0].url_livestreaming != null ? result[0].url_livestreaming.replace("watch?v=", "embed/") : null),
                            angpau_qr: (result[0].angpau_qr != null ? result[0].angpau_qr : null),
                            angpau_rek_bank: (result[0].angpau_rek_bank != null ? result[0].angpau_rek_bank : null),
                            angpau_rek_nomor: (result[0].angpau_rek_nomor != null ? result[0].angpau_rek_nomor : null),
                            angpau_rek_nama: (result[0].angpau_rek_nama != null ? result[0].angpau_rek_nama : null),
                            switch_angpau: result[0].switch_angpau,
                            switch_bank: result[0].switch_bank,
                            switch_kado: result[0].switch_kado,
                            switch_youtube: result[0].switch_streaming,
                            switch_vaksin: result[0].switch_vaksin,
                            alamat_kado: (result[0].alamat_kado != null ? result[0].alamat_kado : null),
                            image_cover: result[0].image_cover,
                            image_cover_potrait: result[0].image_cover_potrait,
                            music: (result[0].musik != null ? result[0].musik : null),
                            switch_story: (result[0].switch_story != null ? result[0].switch_story : null),
                            switch_gallery: (result[0].switch_gallery != null ? result[0].switch_gallery : null)
                        });
                    }
                });
            } else return res.render("404");
        });
    } catch (e) {
        console.log(e);
        return res.render("404");
    }
});

module.exports = router;

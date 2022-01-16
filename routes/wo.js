const express = require('express')
const router = express.Router()
const DB = require('../handler/config')
const auth = require('../middleware/sess_wo_auth')

router.get('/login', (req, res) => {
    if (req.session.isWOLoggedIn)
        return res.redirect('/wo/')
    else {
        const title = "Login ke Panel WO"
        const loadJS = [
            {src: "https://code.jquery.com/jquery-3.6.0.min.js"},
            {src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.js"},
            {src: "https://cdn.jsdelivr.net/npm/admin-lte@3.1/dist/js/adminlte.min.js"},
            {src: "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"},
            {src: "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"},
        ]
        const loadCSS = [
            {src: "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"}
        ]
        return res.render('wo/login', {title, loadJS, loadCSS})
    }
})

router.use(auth)

router.get('/', (req, res) => {
    const nama = req.session.namaWO
    const loadJS = [
        {src: "https://code.jquery.com/jquery-3.6.0.min.js"},
        {src: "https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"},
        {src: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.2.0-rc/js/adminlte.min.js"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.39.0/js/tempusdominus-bootstrap-4.min.js"}
    ];

    const loadCSS = [
        {src: "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"}
    ];
    const routePath = "/";
    return res.render('wo/index', {title: "WO - Dashboard", loadJS, loadCSS, routePath, nama})
})

router.get('/pernikahan', (req, res) => {
    const nama = req.session.namaWO
    const connect = DB.config
    const routePath = '/pernikahan'
    const title = "WO - List Pernikahan"
    const loadCSS = [
        {src: "https://cdn.datatables.net/1.11.2/css/dataTables.bootstrap4.min.css"},
        {src: "https://cdn.datatables.net/responsive/2.2.9/css/responsive.bootstrap4.min.css"},
        {src: "https://cdn.datatables.net/buttons/2.0.0/css/buttons.bootstrap4.min.css"}
    ];
    const loadJS = [
        {src: "https://code.jquery.com/jquery-3.6.0.min.js"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.2.0-rc/js/adminlte.min.js"},
        {src: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"},
        {src: "https://cdn.datatables.net/1.11.2/js/jquery.dataTables.min.js"},
        {src: "https://cdn.datatables.net/1.11.2/js/dataTables.bootstrap4.min.js"},
        {src: "https://cdn.datatables.net/responsive/2.2.9/js/dataTables.responsive.js"},
        {src: "https://cdn.datatables.net/responsive/2.2.9/js/responsive.bootstrap4.min.js"},
        {src: "https://cdn.datatables.net/buttons/2.0.0/js/buttons.bootstrap4.min.js"},
        {src: "https://cdn.datatables.net/buttons/2.0.0/js/dataTables.buttons.js"}
    ];
    try {
        //Query Select
        connect.query("SELECT * FROM pernikahan ORDER BY tanggal DESC", (error, result) => {
            return res.render('wo/pernikahan', {title, result, nama, routePath, loadCSS, loadJS})
        })
    } catch (e) {
        console.log(e)
        return res.render('404')
    }
})

router.get('/tambah-pernikahan', (req, res) => {
    const nama = req.session.namaWO;
    const email = req.session.emailWO
    const loadJS = [
        {src: "https://code.jquery.com/jquery-3.6.0.min.js"},
        {src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.js"},
        {src: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.2.0-rc/js/adminlte.min.js"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"},
        {src: "https://unpkg.com/vuejs-datepicker@1.6.2/dist/vuejs-datepicker.min.js"},
    ];
    const loadCSS = [
        {src: "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"}
    ];
    return res.render('wo/form-pernikahan', {
        title: "WO - Tambah Pernikahan",
        loadJS,
        loadCSS,
        nama,
        email
    })
})

router.get('/pernikahan/:id', (req, res) => {
    const nama = req.session.namaWO
    const id = req.params.id
    const email = req.session.emailWO
    const loadJS = [
        {src: "https://code.jquery.com/jquery-3.6.0.min.js"},
        {src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.js"},
        {src: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/admin-lte/3.2.0-rc/js/adminlte.min.js"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"},
        {src: "https://unpkg.com/vuejs-datepicker@1.6.2/dist/vuejs-datepicker.min.js"},
        {src: "https://cdn.datatables.net/1.11.2/js/jquery.dataTables.min.js"},
        {src: "https://cdn.datatables.net/1.11.2/js/dataTables.bootstrap4.min.js"},
        {src: "https://cdn.datatables.net/responsive/2.2.9/js/dataTables.responsive.js"},
        {src: "https://cdn.datatables.net/responsive/2.2.9/js/responsive.bootstrap4.min.js"},
        {src: "https://cdn.datatables.net/buttons/2.0.0/js/buttons.bootstrap4.min.js"},
        {src: "https://cdn.datatables.net/buttons/2.0.0/js/dataTables.buttons.js"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.min.js"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.0/jspdf.umd.min.js"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.23/jspdf.plugin.autotable.min.js"}
    ];
    const loadCSS = [
        {src: "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"},
        {src: "https://cdn.datatables.net/1.11.2/css/dataTables.bootstrap4.min.css"},
        {src: "https://cdn.datatables.net/responsive/2.2.9/css/responsive.bootstrap4.min.css"},
        {src: "https://cdn.datatables.net/buttons/2.0.0/css/buttons.bootstrap4.min.css"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.css"}
    ];
    return res.render('wo/form-pernikahan', {
        title: "WO - Edit Pernikahan",
        loadJS,
        loadCSS,
        nama,
        email,
        id
    })
})

module.exports = router
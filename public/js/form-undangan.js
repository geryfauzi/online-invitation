var app = new Vue({
    el: '#form-undangan',
    data: {
        session: [],
        story: [],
        ucapan: [],
        guestSession: [],
        error: false,
        confirmation: false,
        editMode: false,
        rsvp: 'Hadir',
        formRSVP: {
            rsvp: 'Hadir',
            kode: '',
            jumlah_dewasa: 1,
            jumlah_anak: 0,
            nama: '',
            alasan: '',
            ucapan: '',
            telepon: ''
        }
    },
    methods: {
        checkCode: async function () {
            if (this.formRSVP.kode === '') {
                this.error = true
                this.confirmation = false
            } else {
                let formData = {...this.formRSVP}
                const res = await fetch('/api/tamu/kode', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {'Content-Type': "application/json"}
                });
                const data = await res.json();
                //
                if (data.code === 0) {
                    this.error = true
                    this.confirmation = false
                } else {
                    this.error = false
                    this.confirmation = true
                    this.formRSVP = data.data
                    this.formRSVP.rsvp = this.rsvp
                    this.guestSession = data.dataSesi
                }
            }
        },
        loadSession: async function () {
            try {
                const res = await fetch(`/api/sesi/${idNikahan}`)
                const data = await res.json()
                this.session = data.data
            } catch (e) {

            }
        },
        loadStory: async function () {
            try {
                const res = await fetch(`/api/story/${idNikahan}`)
                const data = await res.json()
                this.story = data.data
            } catch (e) {

            }
        },
        loadUcapan: async function () {
            try {
                const res = await fetch(`/api/tamu/ucapan/${idNikahan}`)
                const data = await res.json()
                this.ucapan = data.data
            } catch (e) {

            }
        },
        loadTimer: function () {
            let tanggal = new Date(tanggalNikahan)
            tanggal.setHours(tanggal.getHours() + 8)
            tanggal.setMinutes(tanggal.getMinutes())
            tanggal.setSeconds(tanggal.getSeconds())
            var countDownDate = new Date(tanggal).getTime();
            var x = setInterval(function () {
                var now = new Date().getTime();
                var distance = countDownDate - now;
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                console.log(days)
                document.getElementById("hari").innerHTML = days
                document.getElementById("jam").innerHTML = hours
                document.getElementById("menit").innerHTML = minutes
                document.getElementById("detik").innerHTML = seconds
                if (distance < 0) {
                    clearInterval(x);
                    document.getElementById("hari").innerHTML = 0
                    document.getElementById("jam").innerHTML = 0
                    document.getElementById("menit").innerHTML = 0
                    document.getElementById("detik").innerHTML = 0
                }
            }, 1000);
        },
        setHadir: function (params) {
            if (params) {
                this.rsvp = 'Hadir'
                this.formRSVP.rsvp = 'Hadir'
                document.getElementById('btn-hadir').classList.add("btn-primary-lg")
                document.getElementById('btn-hadir').classList.remove("btn-secondary-lg")
                document.getElementById('btn-tidak-hadir').classList.remove("btn-primary-lg")
                document.getElementById('btn-tidak-hadir').classList.add("btn-secondary-lg")
            } else {
                this.rsvp = 'Tidak Hadir'
                this.formRSVP.rsvp = 'Tidak Hadir'
                document.getElementById('btn-hadir').classList.remove("btn-primary-lg")
                document.getElementById('btn-hadir').classList.add("btn-secondary-lg")
                document.getElementById('btn-tidak-hadir').classList.add("btn-primary-lg")
                document.getElementById('btn-tidak-hadir').classList.remove("btn-secondary-lg")
            }
        },
        setJumlah: function (params) {
            if (params) {
                if (this.formRSVP.jumlah_dewasa === 2) {
                    //TODO Nothing
                } else
                    this.formRSVP.jumlah_dewasa = parseInt(this.formRSVP.jumlah_dewasa) + 1
            } else {
                if (this.formRSVP.jumlah_dewasa === 1) {
                    //TODO Nothing
                } else
                    this.formRSVP.jumlah_dewasa = parseInt(this.formRSVP.jumlah_dewasa) - 1
            }
        },
        setJumlahAnak: function (params) {
            if (params) {
                if (this.formRSVP.jumlah_anak === 2) {
                    //TODO Nothing
                } else
                    this.formRSVP.jumlah_anak = parseInt(this.formRSVP.jumlah_anak) + 1
            } else {
                if (this.formRSVP.jumlah_anak === 0) {
                    //TODO Nothing
                } else
                    this.formRSVP.jumlah_anak = parseInt(this.formRSVP.jumlah_anak) - 1
            }
        },
        onSave: async function () {
            try {
                if ((this.formRSVP.jumlah_dewasa) < 1 || this.formRSVP.jumlah_dewasa > 2)
                    toastr.warning("Jumlah tamu dewasa minimal 1, maksimal 2!")
                else if ((this.formRSVP.jumlah_anak) < 0 || this.formRSVP.jumlah_anak > 2)
                    toastr.warning("Jumlah tamu anak - anak minimal 0, maksimal 2!")
                else {
                    let formData = {...this.formRSVP}
                    const res = await fetch('/api/tamu/rsvp', {
                        method: 'PUT',
                        body: JSON.stringify(formData),
                        headers: {'Content-Type': "application/json"}
                    });
                    const data = await res.json();
                    //
                    if (data.code === 0)
                        toastr.error(data.message);
                    else {
                        toastr.success(data.message);
                        this.guestSession = data.data
                        this.editMode = true
                        this.loadUcapan()
                        this.$nextTick(function () {
                            window.domtoimage = domtoimage
                            var container = document.getElementById('capture')
                            domtoimage.toPng(container).then(function (dataUrl) {
                                var link = document.getElementById("download-card");
                                link.download = "undangan.png";
                                link.href = dataUrl;
                            })
                            //Set QR
                            window.QRCode = window.QRCode
                            new QRCode(document.getElementById("kode-qr"), this.formRSVP.kode);
                            //
                        })
                    }
                }
            } catch (e) {
                console.log(e)
            }
        },
        setEditMode: function () {
            this.editMode = false
        }
    },
    mounted() {
        AOS.init();
        this.loadSession()
        this.loadTimer()
        this.loadStory()
        this.loadUcapan()
        $(document).ready(function () {
            // $("#start-modal").modal("toggle");
            // detect scroll top or down
            if ($(".smart-scroll").length > 0) {
                // check if element exists
                var last_scroll_top = 0;
                $(window).on("scroll", function () {
                    scroll_top = $(this).scrollTop();
                    if (scroll_top < last_scroll_top) {
                        $(".smart-scroll").removeClass("scrolled-down").addClass("scrolled-up");
                    } else {
                        $(".smart-scroll").removeClass("scrolled-up").addClass("scrolled-down");
                    }
                    last_scroll_top = scroll_top;
                });
            }
        });
        $(window).scroll(function () {
            if ($(document).scrollTop() > 50) {
                $("nav").addClass("bg-white");
                $(".nav-link").addClass("txt-brown");
            } else {
                $("nav").removeClass("bg-white");
                $(".nav-link").removeClass("txt-brown");
            }
        });
    }
})
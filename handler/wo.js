const DB = require('./config')

const login = async (req, res) => {
    let connect = DB.config
    const {email, password} = req.body
    try {
        //Cek email
        connect.query("SELECT * FROM user_wo WHERE email = ?", [email], (error1, result1) => {
            if (result1.length <= 0)
                return res.json({
                    code: 0,
                    message: "Alamat email tidak terdaftar!"
                })
            else {
                //Cek Password
                connect.query("SELECT * FROM user_wo WHERE email = ? AND password = PASSWORD(?)", [email, password], (error2, result2) => {
                    if (result2.length > 0) {
                        req.session.isWOLoggedIn = true
                        req.session.emailWO = result2[0].email
                        req.session.namaWO = result2[0].nama
                        return res.json({
                            code: 1,
                            message: "Selamat! Anda berhasil login!",
                        })
                    } else
                        return res.json({
                            code: 0,
                            message: "Password anda salah!"
                        })
                })
            }
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    login
}
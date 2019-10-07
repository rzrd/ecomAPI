var jwt = require('jsonwebtoken')
var resp = require('./resp')
var jwtPass = 'rahasia'
var User = require('../models/user.model')

module.exports = (req, res, next) => {
    if (req.headers.token) {
        //header.token adalah headers di ppostman, buat key token, dan valuenyatoken yg didapat dr login
        jwt.verify(req.headers.token, jwtPass, (err, decoded) => {
            //setelah token ditangkap, di decode dgn jwt veirfy
            if (err) {
                resp(res, false, 'gk bisa di decode', err)
            } else {
                User.findById(decoded.id)
                    //decoded.id cek di controller login. ketika token di decode, dia kembali menjadi data  yg kita code di login
                    .then(user => {
                        if (user) {
                            req.userId = user._id
                            req.username = user.username
                            //kita menyimpan user._id (data yg di tokenin), menjadi req.userId agar bisa dipanggil di controller
                            next()
                            //middleware wajib ada next, biar klo logic midle ware selesai, dia melanjutkan ke routes nya
                        } else {
                            resp(res, false, 'user not found')
                        }
                    })
                    .catch(decodeErr => {
                        resp(res, false, 'error gk bisa di decode', decodeErr)
                        console.log(req.userId)
                    })
            }
        })
    } else {
        resp(res, false, 'butuh token/ masukkan token')
    }
}
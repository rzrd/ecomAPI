var User = require('../models/user.model')
var resp = require('../middleware/resp')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var jwtPass = 'rahasia'


exports.create = (req, res) => {
    var newUser = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        image: req.body.image,
        reviews: [req.body.reviews],
        products: [req.body.products]
    })
    newUser.save()
        .then(create => {
            resp(res, true, 'user created', create)
        })
        .catch(err => {
            resp(res, false, 'fail create user', err)
        })
}

exports.showAll = (req, res) => {
    User.find({})
        .then(showAll => {
            resp(res, true, 'muncul semua user', showAll)
        })
        .catch(err => {
            resp(res, false, 'gk bisa tampilin semua user', err)
        })
}

exports.show = (req, res) => {
    User.findById(req.params.id)
        .populate({
            path: 'products',
            select: ['name', 'price','image']
        })
        .populate({
            path: 'reviews',
            select: ['text', 'product']
        })
        //dgn populate, kita bisa memasukkan data di schema product ke dalam schema user
        .then(show => {
            if (show) {
                resp(res, true, 'nih usernya', show)
            } else {
                resp(res, false, 'user udah kehapus', err)
            }
            //if else lagi, karena klo user dihapus, kita klik get, kebacanya data null. pake di semua show tunggal
        })
        .catch(err => {
            resp(res, false, 'user tak ditemukan', err)
        })
}

exports.edit = (req, res) => {
    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
    }
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, useFindAndModify: false, runValidators: true })
        .then(update => {
            resp(res, true, 'user terupdate', update)
        })
        .catch(err => {
            resp(res, false, 'gagal update', err)
        })
}

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id, { useFindAndModify: false })
        .then(hapus => {
            if (hapus) {
                resp(res, true, 'ter-delete', hapus)
            } else {
                resp(res, false, 'user yg terhapus tak bisa ditampilkan', err)
            }
        })
        .catch(err => {
            resp(res, false, 'gagal hapus', err)
        })
}

exports.login = (req, res) => {
    User.findOne({ username: req.body.username })
        //cari username, klo gk ada ke catch klo ada ke then, trus cek passwordnya sama gk.
        .then(dataLogin => {
            var hash = bcrypt.compareSync(req.body.password, dataLogin.password)
            if (hash) {
                var token = jwt.sign({
                    username: dataLogin.username,
                    id: dataLogin._id
                    //_id merujuk ke id yg di generate otomatis oleh mongoDB
                }, jwtPass)
                //jwtPass adalah password random untuk crypt token jwtnya
                resp(res, true, 'berhasil log in', {token:token, userId:dataLogin._id})
            } else {
                resp(res, false, 'password salah')
            }
        })
        .catch(err => {
            resp(res, false, 'username tak terdaftar/ login error', err)
        })
}
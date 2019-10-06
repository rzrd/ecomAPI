var Product = require('../models/product.model')
var resp = require('../middleware/resp')
var User = require('../models/user.model')

exports.productCreate = (req, res) => {
    Product.create({
        name: req.body.name,
        price: req.body.price,
        author: req.userId,
        image: req.body.image
        //req.userId diambil dari cekToken
    })
        .then(newProduct => {
            User.findById(req.userId)
                .then(user => {
                    user.products.push(newProduct._id)
                    //user.products merujuk ke schema user dimana ada data 'products'
                    user.products[0] == null ? user.products.splice(0, 1) : null
                    //karena setiap awal index, datanya selalu null, maka data null itu kita hapus saja
                    user.save()
                    resp(res, true, 'product created', newProduct)
                })
                .catch(errUser => {
                    resp(res, false, 'user product error', errUser)
                    console.log(req.userId)
                })
        })
        .catch(errProduct => {
            resp(res, false, 'product gagal dibuat', errProduct)
        })
}

exports.productShowAll = (req, res) => {
    Product.find({})
        .then(products => {
            resp(res, true, 'semua produk muncul', products)
        })
        .catch(err => {
            resp(res, false, 'produk gk ditemukan', err)
        })
}

exports.productShow = (req, res) => {
    Product.findById(req.params.id)
        .populate({
            path: 'author',
            select: 'username'
        })
        .populate({
            path: 'reviews',
            select: ['text', 'author'],
            populate: {path: 'author', select: ['username','image']}
        })
        .then(product => {
            if (product) {
                resp(res, true, 'produk muncul', product)
            } else {
                resp(res, false, 'id produk salah', err)
            }
        })
        .catch(err => {
            resp(res, false, 'produk gk ditemukan', err)
        })
}

exports.productDelete = (req, res) => {
    Product.findByIdAndRemove(req.params.id, { useFindAndModify: false })
        .then(product => {
            User.findByIdAndUpdate(req.userId, { $pull: { products: { $in: product._id } } }, { useFindAndModify: false })
                //setelah product dihapus, hapus juga id product yg direkam di 'user'
                .then(() => {
                    resp(res, true, 'product deleted', product)
                })
                .catch(errUser => {
                    resp(res, false, 'gk bisa kehapus', errUser)
                })
        })
        .catch(err => {
            resp(res, false, 'batal kehapus', err)
        })
}

exports.productEdit = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, useFindAndModify: false, runValidators: true })
        .then(product => {
            resp(res, true, 'edit product berhasil', product)
        })
        .catch(err => {
            resp(res, false, 'gagal update product', err)
        })
}
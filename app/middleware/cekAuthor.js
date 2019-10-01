var Product = require('../models/product.model')
var resp = require('./resp')
var Review = require('../models/review.model')

exports.product = (req, res, next) => {
    Product.findById(req.params.id)
    .then(productAuthor => {
        if(String(req.userId) == String(productAuthor.author)){
            //productAuthor.user merujuk pada id user pemilik produk, karena sudah populate
            //pakai string karena yg satu object, yg satu string. jadi disamain type datanya dulu.
            next()
        }else{
            resp(res, false, "ini bukan produkmu, tak terauthorized")
        }
    })
    .catch(err => {
        resp(res, false, 'authorized error/ product id salah', err)
    })
}

exports.user = (req, res, next) => {
    if(req.userId == req.params.id){
        next()
    }else{
        resp(res, false, 'ini bukan akunmu, gk terauthorized')
    }
}

exports.review = async (req, res, next) => {
    try{
       var review = await Review.findById(req.params.id)
        if (String(review.author) === String(req.userId)){
            req.productId = review.product
            //menyimpan review.product sbg req.productId biar bisa dipake di controller
            next()
        }else{
            resp(res, false, 'ini bukan reviewmu, tak ter otorisasi')
        }
    }catch(err){
        resp(res, false,'otorisasi review erro', err)
    }
}
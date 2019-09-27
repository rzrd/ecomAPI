var Product = require('../models/product.model')
var resp = require('./resp')

exports.product = (req, res, next) => {
    Product.findById(req.params.id)
    .then(productAuthor => {
        if(String(req.userId) == String(productAuthor.author)){
            //productAuthor.user merujuk pada id user pemilik produk, karena sudah populate
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

// exports.review = async (req, res, next) =>{
//     try{
//         var review = await Review.

//     }catch(err){

//     }
// }
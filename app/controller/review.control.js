var Review = require('../models/review.model')
var resp = require('../middleware/resp')
var User = require('../models/user.model')
var Product = require('../models/product.model')

// exports.reviewCreate = async (req, res) => {
//     try {
//         var queryIdProduct = await Product.findById (req.query.productId)
//         if(queryIdProduct){
//         var review = await Review.create({
//             text: req.body.text,
//             user: req.userId,
//             product: req.query.productId
//         })
//         await User.findByIdAndUpdate(review.user, { $push: { reviews: review._id } })
//         await Product.findByIdAndUpdate(review.product, { $push: { reviews: review._id } })
//         resp(res, true, "review created", review)
//     }else{
//         resp(res, true, "product does not exist", err)
//     }
//     } catch (err) {
//         resp(res, false, 'gagal buat review', err)
//     }
// }

exports.reviewCreate = (req, res) => {
    var cekQueryProductId = Product.findById(req.query.productId)
    if (cekQueryProductId) {
        Review.create({
            text: req.body.text,
            author: req.userId,
            product: req.query.productId
        })
            .then(review => {
                User.findByIdAndUpdate(req.userId, { $push: { reviews: review._id } }, { useFindAndModify: false })
                    //boleh paker req.userId atau review.author
                    .then(() => {
                        Product.findByIdAndUpdate(review.product, { $push: { reviews: review._id } }, { useFindAndModify: false })
                            .then(() => {
                                resp(res, true, 'review created', review)
                            })
                            .catch(errProduct => {
                                resp(res, false, 'gagal review', errProduct)
                            })
                    })
                    .catch(errUser => {
                        resp(res, false, 'review gk masuk ke product', errUser)
                    })
            })
            .catch(err => {
                resp(res, false, 'review error', err)
            })
    } else {
        resp(res, false, 'product does not exist', err)
    }
}


exports.reviewShowAll = (req, res) => {
    Review.find({})
        .populate({
            path: 'author',
            select: 'username'
        })
        .populate({
            path: 'product',
            select: 'name'
        })
        .then(review => {
            resp(res, true, 'semua review', review)
        })
        .catch(err => {
            resp(res, false, 'review gk bisa muncul semua', err)
        })
}

exports.reviewShow = (req, res) => {
    Review.findById(req.params.id)
        .populate({
            path: 'author',
            select: 'username'
        })
        .populate({
            path: 'product',
            select: 'name'
        })
        .then(review => {
            resp(res, true, 'tuh reviewnya', review)
        })
        .catch(err => {
            resp(res, false, 'gk ada review', err)
        })
}

// exports.reviewDelete = (req, res) => {
//     Review.findByIdAndRemove(req.params.id, { useFindAndModify: false })
//         .then(review => {
//             Product.findByIdAndUpdate(req.query.productId, { $pull: { reviews: { $in: review._id } } }, { useFindAndModify: false })
//                 .then(() => {
//                     User.findByIdAndUpdate(req.userId, { $pull: { reviews: { $in: review._id } } }, { useFindAndModify: false })
//                     .then(()=>{
//                         resp()
//                     })
//                     .catch(()=>{
//                         resp()
//                     })
//                 })
//                 .catch(() => {
//                     resp()
//                 })
//         })
//         .catch(err => {
//             resp()
//         })
// }

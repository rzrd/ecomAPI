var Review = require('../models/review.model')
var resp = require('../middleware/resp')
var User = require('../models/user.model')
var Product = require('../models/product.model')

exports.reviewCreate = async (req, res) => {
    try {
        var queryIdProduct = await Product.findById(req.query.productId)
        if (queryIdProduct) {
            var review = await Review.create({
                text: req.body.text,
                author: req.userId,
                product: req.query.productId
            })
            await User.findByIdAndUpdate(review.author, { $push: { reviews: review._id } }, { useFindAndModify: false })
            //bisa pake review.author, bisa lgsg req.userId
            var user = await User.findById(req.userId)
            await user.reviews[0] == null ? user.reviews.splice(0, 1) : null
            await user.save()
            await Product.findByIdAndUpdate(review.product, { $push: { reviews: review._id } }, { useFindAndModify: false })
            resp(res, true, "review created", review)
        } else {
            resp(res, true, "product does not exist", err)
        }
    } catch (err) {
        resp(res, false, 'gagal buat review', err)
    }
}

// exports.reviewCreate = (req, res) => {
//     var cekQueryProductId = Product.findById(req.query.productId)
//     if (cekQueryProductId) {
//         Review.create({
//             text: req.body.text,
//             author: req.userId,
//             product: req.query.productId
//         })
//             .then(review => {
//                 User.findById(req.userId)
//                     //User.findByIdAndUpdate(req.userId, { $push: { reviews: review._id } }, { useFindAndModify: false })
//                     //boleh paker req.userId atau review.author
//                     .then((user) => {
//                         user.reviews.push(review._id)
//                         user.reviews[0] == null ? user.reviews.splice(0, 1) : null
//                         user.save()
//                         Product.findByIdAndUpdate(review.product, { $push: { reviews: review._id } }, { useFindAndModify: false })
//                             .then(() => {
//                                 resp(res, true, 'review created', review)
//                                 res.send(req.query.productId)
//                             })
//                             .catch(errProduct => {
//                                 resp(res, false, 'gagal review', errProduct)
//                             })
//                     })
//                     .catch(errUser => {
//                         resp(res, false, 'review gk masuk ke product', errUser)
//                     })
//             })
//             .catch(err => {
//                 resp(res, false, 'review error', err)
//             })
//     } else {
//         resp(res, false, 'product does not exist', err)
//     }
// }


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
        .then(reviews => {
            resp(res, true, 'semua review', reviews)
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
            if (review) {
                resp(res, true, 'tuh reviewnya', review)
            } else {
                resp(res, false, 'review tak ditemukan', err)
            }
        })
        .catch(err => {
            resp(res, false, 'gk ada review', err)
        })
}

exports.reviewDelete = (req, res) => {
    Review.findByIdAndRemove(req.params.id, { useFindAndModify: false })
        .then(review => {
            Product.findByIdAndUpdate(review.product, { $pull: { reviews: { $in: review._id } } }, { useFindAndModify: false })
                .then(() => {
                    User.findByIdAndUpdate(review.author, { $pull: { reviews: { $in: review._id } } }, { useFindAndModify: false })
                        .then(() => {
                            resp(res, true, 'review terhapus', review)
                        })
                        .catch((revDelUserErr) => {
                            resp(res, false, 'review delete user fail', revDelUserErr)
                        })
                })
                .catch((revDelProErr) => {
                    resp(res, true, 'review delete product fail', revDelProErr)
                })
        })
        .catch(err => {
            resp(res, true, 'review delete fail', err)
        })
}

exports.reviewEdit = (req, res) => {
    Review.findByIdAndUpdate(req.params.id, {$set : req.body}, {new: true, useFindAndModify: false, runValidators: true })
    .then(updReview => {
        resp(res, true, 'review diupdate done', updReview)
    })
    .catch(err=> {
        resp(res, false, 'gagal update review', err)
    })
}
var mongoose = require('mongoose')

var reviewSchema = new mongoose.Schema({
    text: { type: String, required: true, minlength:[10, 'min 10 char'], maxlength: [500,'max 500 char'] },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: undefined },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: undefined }
})

var Review = mongoose.model('Review', reviewSchema)

module.exports = Review
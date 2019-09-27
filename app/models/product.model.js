var mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [4, '4 huruf minimal'],
        maxlength: [20, 'max 20 char']
    },
    price: {
        type: Number,
        required: true,
        min: [1000, 'palng murah 1000']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
})

var Product = mongoose.model('Product', productSchema)

module.exports = Product
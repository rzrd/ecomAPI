var mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [4, '4 huruf minimal'],
        maxlength: [20, 'max 20 char'],
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: [1000, 'palng murah 1000']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: undefined
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        default: undefined
    }],
    image: { type: String,
    default: 'https://stockx.imgix.net/Nike-Air-Max-1-97-Sean-Wotherspoon-NA-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1538080256'}
})

var Product = mongoose.model('Product', productSchema)

module.exports = Product
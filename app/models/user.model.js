var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, default: '' },
    image: { type: String, default: '' },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
})

var User = mongoose.model('User', userSchema)

module.exports = User
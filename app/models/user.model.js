var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, default: '' },
    image: { type: String, default: 'https://vignette.wikia.nocookie.net/twicenation/images/7/76/Happy_Happy_Jihyo_Profile.jpg/revision/latest?cb=20190530235431' },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
})

var User = mongoose.model('User', userSchema)

module.exports = User
var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    username: { type: String, required: true, minlength:[4, 'min 4 char'], maxlength:[15, 'max 15 char'], trim: true },
    password: { type: String, required: true, trim: true },
    email: { type: String, default: '', trim: true },
    image: { type: String, default: 'https://pbs.twimg.com/profile_images/1164752786992484354/PyFcqmzG_400x400.jpg' },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review', default: undefined }],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: undefined }],
})

var User = mongoose.model('User', userSchema)

module.exports = User
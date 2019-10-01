var review = require('../controller/review.control')
var cekToken = require('../middleware/cekToken')
var cekAuthor = require('../middleware/cekAuthor')

module.exports = (app) => {
    app.post('/review', cekToken, review.reviewCreate)
    app.get('/review', review.reviewShowAll)
    app.get('/review/:id', review.reviewShow)
    app.delete('/review/:id', cekToken, cekAuthor.review, review.reviewDelete)
    app.put('/review/:id', cekToken, cekAuthor.review, review.reviewEdit)
}
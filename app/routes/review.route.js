var review = require('../controller/review.control')
var cekToken = require('../middleware/cekToken')

module.exports = (app) => {
    app.post('/review', cekToken, review.reviewCreate)
    app.get('/review', review.reviewShowAll)
    app.get('/review/:id', review.reviewShow)
    //app.delete('/review/:id', review.reviewDelete)
}
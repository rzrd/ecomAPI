var product = require('../controller/product.control')
var cekToken = require('../middleware/cekToken')
var cekAuthor = require('../middleware/cekAuthor')

module.exports = (app) => {
    app.post('/product', cekToken, product.productCreate)
    app.get('/product', product.productShowAll)
    app.get('/product/:id', product.productShow)
    app.delete('/product/:id', cekToken, cekAuthor.product, product.productDelete)
    app.put('/product/:id', cekToken, cekAuthor.product, product.productEdit)
}
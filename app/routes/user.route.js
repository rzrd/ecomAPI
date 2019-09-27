var user = require('../controller/user.control')
var cekUsername = require('../middleware/cekUsername')
var cekToken = require('../middleware/cekToken')
var cekAuthor = require('../middleware/cekAuthor')

module.exports = (app) => {
    app.post('/user', cekUsername.create, user.create)
    app.get('/user', user.showAll)
    app.get('/user/:id', user.show)
    app.put('/user/:id', cekToken, cekAuthor.user, cekUsername.update ,user.edit)
    app.delete('/user/:id', cekToken, cekAuthor.user, user.delete)
    app.post('/user/login', user.login)
}
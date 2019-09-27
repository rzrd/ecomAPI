var User = require('../models/user.model')
var resp = require('./resp')

exports.create = (req, res, next) => {
    User.findOne({username : req.body.username})
    .then(user => {
        if(user){
            resp(res, true, 'username already taken')
        }else{
            next()
        }
    })
    .catch(err => {
        resp(res, false, 'gagal buat user', err)
    })
}

exports.update = (req, res, next) => {
    if(String(req.username) == String(req.body.username)){
        next()
    }else{
        User.findOne({username : req.body.username})
        .then(user =>{
            if(user){
                resp(res, false, 'username is taken')
            }else{
                next()
            }
        })
        .catch(err => {
            resp(res, false, 'error check update username', err)
        })
    }
}
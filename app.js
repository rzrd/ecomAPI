require('dotenv').config()
var express = require('express')
var app = express()
var port = process.env.PORT || 3000
//var port = 3000
var bodyparser = require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors')
var config_server = process.env.DB_ATLAS || process.env.DB_LOCAL
//var config_server = process.env.DB_LOCAL


mongoose.connect(config_server, {useNewUrlParser: true, useUnifiedTopology: true})

app.use(cors())
app.use(bodyparser.json())

require('./app/routes/user.route')(app)
require('./app/routes/product.route')(app)
require('./app/routes/review.route')(app)


//agar mengambil data dari query. liat google utk cara nulis query di kolom addres
app.post('/querypath', (req, res) => {
    res.send({
        query: req.query.testquery
    })
})

app.listen(port, ()=>{console.log('denger di '+port)})
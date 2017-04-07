express = require('express');
bodyParser = require('body-parser')
MongoClient = require('mongodb').MongoClient

app = express();

app.set('view engine', 'ejs')

var db

MongoClient.connect('mongodb://localhost:27017/quotes', function(err, database) {
  if (err) {
  	return console.log(err)
  }

  db = database
  
  app.listen(3000, () => {
  	console.log("Listening to 3000.")
  })
})

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
  db.collection('quotes').find().toArray(function(err, results) {
  	if (err) return console.log(err)
  	res.render('index.ejs', {quotes: results})
  })
})

app.post('/quotes', function (req, res) {
  console.log(req.body)

  db.collection('quotes').save(req.body, (err, result) => {
  	if (err) return console.log(err)
  	console.log("Saved to DB")
    res.redirect('/')
  })
})
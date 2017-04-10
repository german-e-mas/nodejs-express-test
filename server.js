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

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  db.collection('quotes').find().toArray(function(err, results) {
  	if (err) return console.log(err)
  	res.render('index.ejs', {quotes: results})
  })
})

app.put('/quotes', function (req, res) {
  db.collection('quotes').findOneAndUpdate(
    { name: 'Gero' },
    { $set: { name: req.body.name, quote: req.body.quote } },
    { sort: { _id: -1 }, upsert: true },
    function (err, result) {
      if (err) return res.send(err)
      res.send(result)
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

app.delete('/quotes', function (req, res) {
  db.collection('quotes').findOneAndDelete(
    { name: req.body.name },
    function (err, result) {
      if (err) return res.send(500, err)
      res.json('Quote deleted.')
    })
})

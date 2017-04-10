// main.js
var update = document.getElementById('update')
var del = document.getElementById('delete')
var getFile = document.getElementById('file')

update.addEventListener('click', function () {
  fetch('quotes', {
  	method: 'put',
  	headers: { 'Content-Type': 'application/json' },
  	body: JSON.stringify({
  		'name': 'HNDK',
  		'quote': 'Replaced Gero\'s comment.'
  	})
  }).then (function (res) {
  	if (res.ok) return res.json()
  }).then (function (data) {
  	console.log(data)
  	window.location.reload(true)
  })
})

del.addEventListener('click', function () {
  fetch('quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'name': 'HNDK' })
  }).then(function (res) {
    if (res.ok) return res.json()
  }).then (function (data) {
    console.log(data)
    window.location.reload(true)
  })
})

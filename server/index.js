const express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/fullStack");
const app = express();
app.use(bodyParser());

var stockSchema = new mongoose.Schema({
	name: String
});

var Stock = mongoose.model("Stock", stockSchema);

// var george = new Stock({
// 	name: "MSFT",
// 	value: 200
// });

// george.save(function(err, stock){
// 	if(err){
// 		console.log(err)
// 	} else {
// 		console.log('Here is the stock')
// 		console.log(stock)
// 	}
// })


app.get('/user', (req, res) => {
	Stock.find({}, (err, stocks) => {
		if(err){
			console.log(err)
		} else {
			res.send(stocks)
		}
	})
})

app.post('/user', (req, res) => {
	var newStock = new Stock({
		name: req.body["name"]
	});
	newStock.save((err, stock) => {
		if(err){
			console.log(err)
		} else {
			console.log(stock)
		}
	})
})

app.listen(2000, () => console.log(`Listening to port 2000`))






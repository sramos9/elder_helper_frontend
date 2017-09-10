const express       = require('express');
const app           = express();
const bodyParser 		= require('body-parser');

app.use(bodyParser.json()); //creates a property on request called req.body
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));


app.listen(3001, ()=>{
	console.log('listening....');
});

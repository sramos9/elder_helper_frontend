const express       = require('express');
const app           = express();
const bodyParser 		= require('body-parser');
const PORT		=process.env.PORT || 3004;

app.use(bodyParser.json()); //creates a property on request called req.body
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));


app.listen(PORT, ()=>{
	console.log('listening....');
});

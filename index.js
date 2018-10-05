let express = require('express');
let app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

let movieRoute = require('./routes/movie.route');
app.use('/movies', movieRoute);

app.get('/', (req, res)=> {
    res.redirect('/movies');
})

app.listen(3333, () => {
    console.log('Server is listening on port 3333');
})

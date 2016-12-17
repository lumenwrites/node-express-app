const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
/* grab port from the env variable that heroku has set */
/* use 3000 by default */
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+'/views');
app.set('view engine', 'hbs');
/* Use middleware to serve static files */
app.use(express.static(__dirname + '/public'));
app.use((res, req, next)=>{
    var now = new Date().toString();
    console.log(`${now}: ${req.method} ${req.url}`);
    /* fs.appendFile('server.log', log)*/
    next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

app.get('/', (req, res)=>{
    /* Return in response */
    /* Req contains all the request info. Headers, body info, etc. */
    res.render('index.hbs', {
	pageTitle: 'Index Page',
	welcomeMessage: 'Hello heroku!'
    }); 

    /* Send json */
    /* 
    res.send({
	name: 'Ray',
	likes: [
	    'Webdev',
	    'Comics'
	]
    });
    */
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
	pageTitle: 'About Page'
    }); 
});



app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

// https://www.youtube.com/watch?v=-bI0diefasA
// app code https://www.youtube.com/redirect?redir_token=e8IBCYgkieyhO91bxy6LdTMO8Rx8MTU2NjIzMjgyNUAxNTY2MTQ2NDI1&event=video_description&v=-bI0diefasA&q=https%3A%2F%2Fgithub.com%2FFaztTech%2Fnodejs-notes-app
/*
npm init - y
npm i - D express morgan nodemon
		(morgan is a middleware to allow to see request on the console, nodemon restart the server after a change)

additional modules:
* express-handlebars, is a template engine
* express-session, to create session in the server
* method-override, to extend html form functionality, GET POST PUT DELETE
* mongoose, ORM for mongoDB
* passport passport-local, for login
* bcryptjs, hash password
* connect-flash, for flash messages

from 2.03.00
*/

const express = require('express');
const morgan = require('morgan');// allows to view request through the console
const path = require('path');// package built-in in nodeJS
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');// allow html form use other html verbs, PUT, DELETE
const session = require('express-session');
const flash = require('connect-flash');// to show flash messages


// server initializing
const app = express();
require('./database');

// SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));// set views folder

// handlebars config
app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),// set the layout folder relative to the views folder config, so that path.join do string concatenation: /views/layouts
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs'// set views file extension
}));

app.set('view engine', '.hbs');// set handlebars


// MIDDLEWARES, function that are executed in the middle between server and response
// urlencoded allows to use data coming from html forms
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
	secret: 'mysecretapp',
	resave: true,
	saveUninitialized: true
}));

app.use(flash());



// GLOBAL VARIALBLES
// set global to make flash available for all views
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	next();// important to allow node process next operations
});

// ROUTES
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));


// STATIC FILES
// __dirname is pointing to current dir
app.use(express.static(path.join(__dirname, 'public')));


// SERVER LISTENING
app.listen(app.get('port'), () => {
	console.log('server on port ', app.get('port'));
});
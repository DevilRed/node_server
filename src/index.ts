// https://www.youtube.com/watch?v=-bI0diefasA
// app code https://www.youtube.com/redirect?redir_token=e8IBCYgkieyhO91bxy6LdTMO8Rx8MTU2NjIzMjgyNUAxNTY2MTQ2NDI1&event=video_description&v=-bI0diefasA&q=https%3A%2F%2Fgithub.com%2FFaztTech%2Fnodejs-notes-app
/*
npm init - y
npm i - D express morgan nodemon
		(morgan is a middleware to allow to see request on the console, nodemon restat the server after a change)

additional modules:
* express-handlebars, is a template engine
* express-session, to create session in the server
* method-override, to extend html form functionality, GET POST PUT DELETE
* mongoose, ORM for mongoDB
* passport passport-local, for login
* bcryptjs, hash password
* connect-flash, for flash messages

from 7.30
*/
const express = require('express');
const app = express();
const morgan = require('morgan');

// config
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// routes
/* app.get('/', (req, res) => {
	res.json({"title": "hello there"});
}); */
app.use(require('./routes.ts'));
app.use('/api/movies', require('./movies'));// set endpoint url from .use

// start the server
app.listen(3000, () => {
	console.log(`server on port ${app.get('port')}`);
})
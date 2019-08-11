// https://www.youtube.com/watch?v=bK3AJfs7qNY
/*
npm init - y
npm i - D express morgan nodemon
		(morgan is a middleware to allow to see request on the console, nodemon restat the server after a change)
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

// start the server
app.listen(3000, () => {
	console.log(`server on port ${app.get('port')}`);
})
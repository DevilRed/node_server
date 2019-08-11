const { Router } = require('express');
const router = Router();

const movies = require('./sample.json');

router.get('/', (req:any, res:any) => {
	res.json(movies);
});

router.post('/', (req:any, res:any) => {
	const { title, director, year, rating } = req.body;
	if(title && director && year && rating) {
		const id = movies.length + 1;// simulating id generation
		const newMovie = { ...req.body, id };
		movies.push(newMovie);
		res.json(movies);
	} else {
		res.status(500).send('wrong request');
	}
});

module.exports = router;
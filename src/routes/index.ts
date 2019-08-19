// get the router module from express
const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('index');// since views are set in config, use view name with render method
});

router.get('/about', (req, res) => {
	res.render('about');
});

module.exports = router;
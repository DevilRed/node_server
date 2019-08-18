// get the router module from express
const router = require('express').Router();

router.get('/', (req, res) => {
	res.send('index');
})

module.exports = router;
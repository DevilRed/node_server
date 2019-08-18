const router = require('express').Router();

router.get('/users/singin', (req, res) => {
	res.send('entering the app')
});

router.get('/users/singup', (req, res) => {
	res.send('auth form')
});

module.exports = router;
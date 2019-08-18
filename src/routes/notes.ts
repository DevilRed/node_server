const router = require('express').Router();


router.get('/notes', (req, res) => {
	res.send('notes from db');
});
module.exports = router;
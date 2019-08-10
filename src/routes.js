const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
	res.json({ "title": "hello there from isolated file" });
});

module.exports = router;
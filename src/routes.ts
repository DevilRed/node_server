const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
	res.json({ "title": "hello there from isolated file with typescript" });
});

module.exports = router;
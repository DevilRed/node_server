const router = require('express').Router();

// models, bring Note schema, it allows to interact with the DB
const Note = require('../models/Note');

// index
router.get('/notes', async (req, res) => {
	const notes = await Note
		.find()// add to .find ({params}) for get specific data
		.sort({date: 'desc'})// sort results
		;
	res.render('notes/all-notes', { notes })
});

router.get('/notes/add', (req, res) => {
	res.render('notes/new-note');
});

router.post('/notes/new-note', async (req, res) => {
	// console.log(req.body);
	const { title, description } = req.body;
	// validating data
	const errors = [];// create a const for errors
	if(!title) {
		errors.push({text: 'Please write a title'});
	}
	if(!description) {
		errors.push({ text: 'Please write a description' });
	}
	if(errors.length > 0) {
		res.render('notes/new-note', {// send extra parameters to the rendered view
			errors,
			title,
			description
		});
	} else {
		const newNote = new Note({title, description});
		// console.log(newNote);
		await newNote.save();
		res.redirect('/notes');// express redirect to route
	}
});

router.get('/notes/edit/:id', async (req, res) => {
	// get the note
	const note = await Note.findById(req.params.id);
	res.render('notes/edit-note', {note});
});

// expect a PUT request
router.put('/notes/edit-note/:id', async (req, res) => {
	const { title, description } = req.body;
	// id = req.params.id,  params data comes from URL
	await Note.findByIdAndUpdate(req.params.id, { title, description });
	res.redirect('/notes');
});

router.delete('/notes/delete/:id', async (req, res) => {
	await Note.findByIdAndDelete(req.params.id)
	res.redirect('/notes');
});

module.exports = router;
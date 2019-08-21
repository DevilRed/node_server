const router = require('express').Router();

// models, bring Note schema, it allows to interact with the DB
const Note = require('../models/Note');
// get middleware
const { isAuthenticated } = require('../helpers/auth');

// index
router.get('/notes', async (req, res) => {
	const notes = await Note
		.find({user: req.user.id})// add to .find ({params}) for get specific data
		.sort({date: 'desc'})// sort results
		;
	res.render('notes/all-notes', { notes })
});

// use custom middleware by: adding it to the route after the route name and before any other process
router.get('/notes/add', isAuthenticated, (req, res) => {
	res.render('notes/new-note');
});

// add middleware
router.post('/notes/new-note', isAuthenticated, async (req, res) => {
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
		newNote.user = req.user.id;// get the user from global variables
		await newNote.save();
		req.flash('success_msg', 'Note added successfully');
		res.redirect('/notes');// express redirect to route
	}
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
	// get the note
	const note = await Note.findById(req.params.id);
	res.render('notes/edit-note', {note});
});

// expect a PUT request
router.put('/notes/edit-note/:id', async (req, res) => {
	const { title, description } = req.body;
	// id = req.params.id,  params data comes from URL
	await Note.findByIdAndUpdate(req.params.id, { title, description });
	req.flash('success_msg', 'Note updated successfully');
	res.redirect('/notes');
});

router.delete('/notes/delete/:id', async (req, res) => {
	await Note.findByIdAndDelete(req.params.id)
	req.flash('success_msg', 'Note delete successfully');
	res.redirect('/notes');
});

module.exports = router;
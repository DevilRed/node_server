const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
	res.render('users/signin');
});

// use the passport config
router.post('/users/signin', passport.authenticate('local', {
	successRedirect: '/notes',
	failureRedirect: '/users/signin',
	failureFlash: true// to use flash messages
}));

router.get('/users/signup', (req, res) => {
	res.render('users/signup')
});

router.post('/users/signup', async (req, res) => {
	const { name, email, password, confirm_password } = req.body;
	// validation
	const errors = [];
	if (name.length <= 0 || email.length <= 0 || password.length <= 0 || confirm_password.length <= 0) {
		errors.push({text: 'Please insert data'});
	}
	if(password !== confirm_password) {
		errors.push({text: 'Passwords do  not match'});
	}
	if(password.length < 4) {
		errors.push({text: 'Password must be at least 4 characters'});
	}
	if(errors.length > 0) {
		res.render('users/signup', { errors, name, email, password, confirm_password});
	}
	else {
		// check if email is already used in the system
		const userEmail = await User.findOne({ email: email});
		if(userEmail) {
			req.flash('error_msg', 'The email is already taken');
			res.render('users/signup');
		}
		else {
			// create a user object
			const newUser = new User({
				name,
				email,
				password
			});
			// encrypt password using defined method in model schema
			newUser.password = await newUser.encryptPassword(password);
			await newUser.save();
			req.flash('success_msg', 'You are registered');
			res.redirect('/users/signin');
		}
	}
});

module.exports = router;
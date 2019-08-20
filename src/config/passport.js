const passport = require('passport');
const localStrategy = require('passport-local');

const User = require('../models/User');

// config for the 'passport' library
passport.use(new localStrategy({
	usernameField: 'email'
}, async (email, password, done) => {
	const user = await User.findOne({email: email});
	if(!user) {
		// if user is not found, finish the process using done
		// done(error, user, message) check library documentation for better understanding
		return done(null, false, { message: 'User not found'});// this message is saved a variable error, an extra config is needed in index.ts
	} else {
		// user is found check if password matches with a method from the User model
		const match = await user.matchPassword(password);
		if(match) {
			// there is no error and a user set
			return done(null, user);
		} else {
			// no error, no user, but a message
			return done(null, false, { message: 'Incorrect password'});
		}
	}
}));

// session config
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	})
})
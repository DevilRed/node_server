const helpers = {};

// custo middleware
helpers.isAuthenticated = (req, res, next) => {
	// req.isAuthenticated is built-in in passport
	// if user is logged, returns true, if not returns false
	if(req.isAuthenticated()) {
		// next = continue with the next action
		return next();
	}
	// show error
	req.flash('error_msg', 'Not authorized');
	res.redirect('/users/signin');
}

module.exports = helpers;
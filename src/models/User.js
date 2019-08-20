const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
	name: { type: String, required: true},
	email: { type: String, required: true},
	password: { type: String, required: true},
	date: { type: Date, default: Date.now()}
});

// hashing passwords
userSchema.methods.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const hash = bcrypt.hash(password, salt);
	return hash;
};

// method to use with login
userSchema.methods.matchPassword = async function (password) {
	// using old function to get the right scope of the userSchema to compare password with the schema
	return await bcrypt.compare(password, this.password);
}
module.exports = mongoose.model('User', userSchema);
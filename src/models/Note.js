const mongoose = require('mongoose');
const { Schema } = mongoose;

// define schema to use with mongoDB
const NoteSchema = new Schema({
	title: { type: String, required: true},
	description: { type: String, required: true},
	date: { type: Date, default: Date.now}// mongoDB timestamp
});

// export schema using mongoose
module.exports = mongoose.model('Note', NoteSchema);
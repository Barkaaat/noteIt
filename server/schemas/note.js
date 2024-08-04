const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
	title: {type: String, required: true},
	content: {type: String, required: true},
	dataAdd: {type: Date, required: true},
	dataUpdate: {type: Date, required: true},
});

module.exports = mongoose.model('Note', noteSchema);
const mongoose = require('mongoose');
const Note = require('./schemas/note');

class Database {
	constructor() {
		// this.Url = "mongodb://localhost:27017/notes";
		this.Url = process.env.MONGO_URL || "mongodb+srv://noteIt:noteIt@cluster0.egyxely.mongodb.net/noteIt?retryWrites=true&w=majority";
	}

	connect() {
		mongoose.connect(this.Url)
		.then (() => {
				console.log('connect is successful');
		})
		.catch((err) => {
				console.log(`error in connection ${err}`);
		});
	}

	addNote(note) {
		return new Promise ((resolve, reject) => {
			note['dataAdd'] = new Date();
			note['dataUpdate'] = new Date();
			let newNote = new Note(note);
			newNote.save()
			.then(doc => resolve(doc))
			.catch(err => reject(err))
		});
	}

	getNote() {
		return new Promise((resolve, reject) => {
			Note.find({})
			.then(data => resolve(data))
			.catch(err => reject(err));
		});
	}

	getNoteById(id) {
		return new Promise((resolve, reject) => {
			Note.findById(id)
			.then(data => {
				resolve(data);
			})
			.catch(err => reject(err));
		});
	}

	updateNote(note) {
		return new Promise((resolve, reject) => {
			note["dataUpdate"] = new Date();
			Note.findByIdAndUpdate(note["_id"], note)
			.then(data => resolve(data))
			.catch(err => reject(err));
		});
	}

	deleteNote(id) {
		return new Promise((resolve, reject) => {
			Note.findByIdAndDelete(id)
			.then(data => resolve(data))
			.catch(err => reject(err));
		});
	}

	getNoteByTitle(noteTitle) {
		return new Promise((resolve, reject) => {
			const query = { title: {$regex: new RegExp(noteTitle, 'i')} };
			Note.find(query)
			.then(data => resolve(data))
			.catch(err => reject(err));
		});
	}
}

module.exports = Database;

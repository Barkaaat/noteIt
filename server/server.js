const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');
const Database = require('./Database');

const app = express();
const db = new Database();

app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));

// create post api to create new note
app.post('/notes', (req, res) => {
	const body = req.body;
	db.addNote(body)
	.then(data => res.send(data))
	.catch(err => res.status(500).send(err));
});

// create get api to return all notes
app.get('/notes', (req, res) => {
	const { title } = req.query;
	if (title) {
		db.getNoteByTitle(title)
		.then(data => res.send(data))
		.catch(err => res.status(500).send(err));
	}
	else {
		db.getNote()
		.then(data => res.send(data))
		.catch(err => res.status(500).send(err));
	}
});

// create get api to return note by id
app.get('/notes/:id', (req, res) => {
	const { id } = req.params;
	db.getNoteById(id)
	.then(data => {
		if (!data) res.status(404).send("Note is not found "+id)
		else res.send(data);
	})
	.catch(err => res.status(500).send(err));
});

// create put api to update note by id
app.put('/notes', (req, res) => {
	db.updateNote(req.body)
	.then(data => {
		if (!data) res.status(404).send("Note is not found "+id)
		else res.send(data);
	})
	.catch(err => res.status(500).send(err));
});

// create delete api to delete note by id
app.delete('/notes/:id', (req, res) => {
	const { id } = req.params;
	db.deleteNote(id)
	.then(data => {
		if (!data) res.status(404).send("Note is not found "+id)
		else res.send(data);
	})
	.catch(err => res.status(500).send(err));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`sever started on port ${port}`);
	db.connect();
});
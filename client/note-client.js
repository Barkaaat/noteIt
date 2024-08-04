const url = "http://localhost:3000";

async function addNote(note) {
	const res = await fetch(`${url}/notes`,{
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(note)
	});
	return res;
};

async function updateNote(note) {
	const res = await fetch(`${url}/notes`,{
		method: "PUT",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(note)
	});
	return res;
};

async function deleteNote(id) {
	const res = await fetch(`${url}/notes/${id}`,{
		method: "DELETE"
	});
	return res;
};

async function getNoteById(id) {
	const res = await fetch(`${url}/notes/${id}`); // default is get method
	return res.json();
};

async function getNote(title) {
	let url2 = `${url}/notes`;
	if (title) url2 += `/?title=${title}`;
	const res = await fetch(url2);
	return res.json();
};
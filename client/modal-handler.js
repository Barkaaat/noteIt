function openAddModal() {
	let model = document.getElementById("addNoteModal");
	let closeSpn = document.getElementById("closeAdd");
	let canclBtn =document.getElementById("cancelAddNoteBtn");
	clearAddModal();
	model.style.display = "block";

	closeSpn.onclick = () => model.style.display = "none";
	canclBtn.onclick = () => model.style.display = "none";
}

function clearAddModal() {
	document.getElementById("addTitle").value = "";
	document.getElementById("addContent").value = "";
	document.getElementById("addError").innerHTML = "";
}

function saveNewNote() {
	const Title = document.getElementById("addTitle").value;
	const Content = document.getElementById("addContent").value;
	const data = { title: Title, content: Content };
	addNote(data)
	.then(res => {
		if (res.ok) {
			let model = document.getElementById("addNoteModal");
			model.style.display = "none";
			res.json().then(json => updateNotesTable(json["_id"]));
		}
		else {
			res.text()
			.then(err => document.getElementById("addError").innerHTML = err);
		}
	})
	.catch(err => document.getElementById("addError").innerHTML = err);
}

function openEditModal(id) {
	let model = document.getElementById("editNoteModal");
	let closeSpn = document.getElementById("closeEdit");
	let canclBtn =document.getElementById("cancelEditNoteBtn");
	clearAddModal();
	model.style.display = "block";

	closeSpn.onclick = () => model.style.display = "none";
	canclBtn.onclick = () => model.style.display = "none";

	loadNoteData(id);
}

function loadNoteData(id) {
	let modal = document.getElementById("editNoteModal");
	let noteId = document.createAttribute("noteid");
	noteId.value = id;
	modal.setAttributeNode(noteId);

	getNoteById(id)
	.then(data => {
		document.getElementById("editTitle").value = data["title"];
		document.getElementById("editContent").value = data["content"];
	})
}

function saveEditNote() {
	let modal = document.getElementById("editNoteModal");
	let noteId = modal.getAttribute("noteid");

	const newTitle = document.getElementById("editTitle").value;
	const newContent = document.getElementById("editContent").value;

	const note = { _id: noteId, title: newTitle, content: newContent };
	updateNote(note)
	.then(res => {
		if (res.ok) {
			let model = document.getElementById("editNoteModal");
			model.style.display = "none";
			updateNotesTable(noteId);
		}
		else {
			res.text()
			.then(err => document.getElementById("editError").innerHTML = err);
		}
	})
	.catch(err => document.getElementById("editError").innerHTML = err);
}
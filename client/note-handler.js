function updateNotesTable(id, title) {
	let table = document.getElementById("notes-table");
	let cnt = table.rows.length;
	while (--cnt) table.deleteRow(cnt);
	getNote(title)
	.then(data => {
		data.forEach(note => {
			let row = table.insertRow(1);
			let Id = document.createAttribute("id");
			Id.value = note["_id"];
			row.setAttributeNode(Id);
			let cl1 = row.insertCell(0);
			let cl2 = row.insertCell(1);
			let cl3 = row.insertCell(2);
			let cl4 = row.insertCell(3);

			cl1.innerHTML = note['title'];
			cl2.innerHTML = note['content'];
			cl3.innerHTML = note['dataUpdate'];
			cl4.innerHTML =`<a onclick=openEditModal('${note["_id"]}') href="#"><img src="images/edit.png" style= "width: 22px;"></a>
							<a onclick=confirmDeleteNote('${note["_id"]}') href="#"><img src="images/delete.png" style= "width: 22px;"></a>`;
		})
	})
	.then(() => {
		if (id) {
			let row = document.getElementById(id);
			row.setAttribute("style", "animation: new-row 5s;");
		}
	})
}

function searchNotes() {
	const search = document.getElementById("searchInput").value;
	updateNotesTable(undefined, search);
}

function confirmDeleteNote(id) {
	let action = confirm("you want to delete this note ?");
	if (action) {
		deleteNote(id).then(() => updateNotesTable());
	}
}
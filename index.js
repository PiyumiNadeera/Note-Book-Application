var form = document.getElementById("formContent");
var ndate = document.getElementById("noteDate");
var title = document.getElementById("noteTitle");
var description = document.getElementById("noteBody");
var tableItems = document.getElementById("items");
var tableDiv = document.getElementById("tableContent");
var search = document.getElementById("serachField");
var restting = document.getElementById('reset');

var noteCount = 0;
var newNote;
var isUpdate = false;
var record = "";
var note = "";
var body = "";
var day = "";

window.onload = updateTable();
form.addEventListener("submit", addNote);
search.addEventListener("keyup", searchNotes);
tableItems.addEventListener("click", removeNotes);
tableItems.addEventListener("click", viewNotes);
restting.addEventListener('click',resetAll);

//updating notes
function updateTable() {
  if (noteCount > 0) {
    tableDiv.style.display = "";

    if (isUpdate) {
      record.firstChild.textContent = ndate.value;
      note.firstChild.textContent = title.value;
      note.lastChild.textContent = description.value;
      isUpdate = false;
      noteCount--;
    } else {
      tableItems.appendChild(newNote);
    }
  } else {
    tableDiv.style.display = "none";
  }
}

//adding notes
function addNote(e) {
  e.preventDefault();

  if (title.value == "" || description.value == "" || ndate.value == "") {
    alert("Please fill all the fields");
  } else {
    var row = document.createElement("tr");
    row.className = "item";

    var td1 = document.createElement("td");
    td1.appendChild(document.createTextNode(ndate.value));

    var td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(title.value));

    var span = document.createElement("span");
    span.className = "note-body";
    span.appendChild(document.createTextNode(description.value));

    td2.appendChild(span);

    var td3 = document.createElement("td");
    td3.className = "cellView";
    var btn1 = document.createElement("button");
    btn1.appendChild(document.createTextNode("View"));
    btn1.setAttribute("id", "vw");
    td3.appendChild(btn1);

    var td4 = document.createElement("td");
    td4.className = "cellDelete";
    var btn2 = document.createElement("button");
    btn2.appendChild(document.createTextNode("Delete"));
    btn2.setAttribute("id", "dlt");
    td4.appendChild(btn2);

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);

    noteCount++;
    newNote = row;

    updateTable();
  }
    resetAll();
}

//searching for note
function searchNotes(k) {
  var searchText = k.target.value.toLowerCase();

  var list = tableItems.getElementsByClassName("item");

  var listArray = Array.from(list);
  console.log(listArray);

  listArray.forEach(function (items) {
    var nTite = items.firstChild.nextSibling.textContent;

    if (nTite.toLowerCase().indexOf(searchText) != -1) {
      items.style.display = "";
    } else {
      items.style.display = "none";
    }
  });
}

//deleting notes
function removeNotes(a) {
  if (a.target.id === "dlt") {
    if (confirm("Are you sure ? ")) {
      var tr = a.target.parentElement.parentElement;
      items.removeChild(tr);
      noteCount--;
      if (noteCount <= 0) {
        tableDiv.style.display = "none";
      }
    }
  }
}

//viewing already added notes
function viewNotes(e) {
  if (e.target.id === "vw") {
    record = e.target.parentElement.parentElement;

    day = record.firstChild;
    ndate.value = day.textContent;

    note = record.firstChild.nextSibling;
    title.value = note.firstChild.textContent;

    description.value = note.lastChild.textContent;
    isUpdate = true;
  }
}

//resetting
function resetAll(){
    ndate.value='';
    title.value='';
    description.value ='';
    isUpdate=false;
    newNote='';
}

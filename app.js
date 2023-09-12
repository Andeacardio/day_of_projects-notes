const input = document.querySelector(".notes-box-top-text");
const addNote = document.querySelector(".notes-box-top-button");
const notesBox = document.querySelector(".notes-box-bottom");

//showNotes
function showNotes() {
  let notesArr4 = JSON.parse(localStorage.getItem("notesArr"));
  if (notesArr4) {
    notesArr4.forEach((el) => {
      const divMain = document.createElement("div");
      divMain.classList.add("new-box-main");

      //div with p.name and button
      const div = document.createElement("div");
      div.classList.add("new-box");
      const para = document.createElement("p");
      const node = document.createTextNode(el.name);
      para.appendChild(node);
      const button = document.createElement("button");
      button.addEventListener("click", () => deleteNote(el.key));
      const buttonNode = document.createTextNode("X");
      button.appendChild(buttonNode);
      div.appendChild(para);
      div.appendChild(button);

      //div with date
      const dateDiv = document.createElement("div");
      div.classList.add("date-box");
      const para2 = document.createElement("p");
      const node2 = document.createTextNode(el.day);
      para2.appendChild(node2);
      dateDiv.appendChild(para2);
      const para3 = document.createElement("p");
      const node3 = document.createTextNode(el.time);
      para3.appendChild(node3);
      dateDiv.appendChild(para3);
      const para4 = document.createElement("p");
      const node4 = document.createTextNode(el.date);
      para4.appendChild(node4);
      dateDiv.appendChild(para4);

      divMain.appendChild(dateDiv);
      divMain.appendChild(div);
      notesBox.appendChild(divMain);
    });
  }
}
showNotes();

//add new note
addNote.addEventListener("click", (event) => {
  notesBox.replaceChildren("");
  //check if input is empty
  if (input.value === "") {
    alert("Please, write your note!");
  } else {
    //crud counter for notes
    let currentCount = localStorage.getItem("currentCount");
    if (currentCount === null) {
      localStorage.setItem("currentCount", 1);
    } else {
      localStorage.setItem("currentCount", ++currentCount);
    }

    //crud array of notes and push new note
    let notesArr = JSON.parse(localStorage.getItem("notesArr"));
    let key = localStorage.getItem("currentCount");

    //add date
    const d = new Date();
    const currentDate = d.toLocaleDateString();
    const currentTime = d.toLocaleTimeString();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let currentDay = days[d.getDay()];

    if (notesArr === null) {
      let notesArr3 = [];
      let obj = {};
      obj.key = key;
      obj.name = input.value;
      obj.time = currentTime;
      obj.date = currentDate;
      obj.day = currentDay;
      notesArr3.push(obj);
      localStorage.setItem("notesArr", JSON.stringify(notesArr3));
    } else {
      let notesArr2 = notesArr;
      let obj1 = {};
      obj1.key = key;
      obj1.name = input.value;
      obj1.time = currentTime;
      obj1.date = currentDate;
      obj1.day = currentDay;
      notesArr2.push(obj1);
      localStorage.setItem("notesArr", JSON.stringify(notesArr2));
    }
    input.value = "";
    showNotes();
  }
});

//delete Note
function deleteNote(key) {
  let notesArr5 = JSON.parse(localStorage.getItem("notesArr"));
  console.log(key);
  let newnotesArr2 = notesArr5.filter(function (el) {
    return el.key !== key;
  });
  console.log(newnotesArr2);
  localStorage.setItem("notesArr", JSON.stringify(newnotesArr2));
  location.reload();
}

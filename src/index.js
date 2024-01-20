import students from "./students.json" assert { type: "json" };

const add = document.querySelector("#add");
const edit = document.querySelector("#edit");
const minus = document.querySelector("#minus");
const submit = document.querySelector("#submit");
const backdrop = document.querySelector(".backdrop");
const info = document.querySelectorAll(".card-info");
const list = document.querySelector(".list");
const title = document.querySelector("#title");
const close = document.querySelector("#close");
const search = document.querySelector("#search");
const searchbar = document.querySelector(".searchbar");
const searchbarInput = document.querySelector("#searchbarInput");
let index = -1;
let jsonData = students;

function reloadCards(arr) {
    for (const i of info) {
      i.value = "";
    }
    list.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
      list.insertAdjacentHTML(
        "beforeend",
        `<li class="item" id="${i}">
                <p>Name: ${arr[i].name}</p>
                <p>Surname: ${arr[i].surname}</p>
                <p>Age: ${arr[i].age}</p>
                <p>Course: ${arr[i].course}</p>
                <p>Faculty: ${arr[i].faculty}</p>
            </li>`
      );
    }
}

add.addEventListener("click", () => {
    title.textContent = "Add Card";
    backdrop.classList.remove("off");
});

let cardsArr = [];

submit.addEventListener("click", (e) => {
    e.preventDefault();
    backdrop.classList.add("off");
    if (
      info[0].value.trim() !== "" &&
      info[1].value.trim() !== "" &&
      info[2].value.trim() !== "" &&
      info[3].value.trim() !== "" &&
      info[4].value.trim() !== ""
    ) {
        if (title.textContent === "Add Card") {
        cardsArr.push({
          name: info[0].value,
          surname: info[1].value,
          age: info[2].value,
          course: info[3].value,
          faculty: info[4].value,
        });
      } else if (title.textContent === "Edit Card") {
        const cards = document.querySelectorAll(".item");
        cardsArr[index] = {
          name: info[0].value,
          surname: info[1].value,
          age: info[2].value,
          course: info[3].value,
          faculty: info[4].value,
        };
        }
        jsonData = JSON.stringify(cardsArr);
    }
    else {
        alert("Заповніть всі поля");
    }
    reloadCards(cardsArr);
});

window.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
        backdrop.classList.add("off");
    }
});

edit.addEventListener("click", () => {
    const cards = document.querySelectorAll(".item");
    for (const i of cards) {
        i.classList.add("hov");
        i.addEventListener("click", () => {
            title.textContent = "Edit Card";
            backdrop.classList.remove("off");
            index = i.id;
        });
    }
});

minus.addEventListener("click", () => {
    const cards = document.querySelectorAll(".item");
    for (const i of cards) {
        i.classList.add("hov");
        i.addEventListener("click", () => {
            index = i.id;
            cardsArr.splice(index, index + 1);
            reloadCards(cardsArr);
            jsonData = JSON.stringify(cardsArr);
        });
    }
});

search.addEventListener("click", () => {
    searchbar.classList.toggle("vis");
});
close.addEventListener("click", () => {
    searchbar.classList.toggle("vis");
});
function searchCheck(obj) {
    return obj.surname.includes(searchbarInput.value.trim())
}
searchbarInput.addEventListener("input", e => {
    const tempArr = cardsArr.filter(searchCheck);
    reloadCards(tempArr);
});

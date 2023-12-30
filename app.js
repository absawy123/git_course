// //#region Initial Data Source
// let todosList = [
//   { title: "Play Tennis", statusCode: "1" },
//   { title: "Deliver JS Assignment", statusCode: "1" },
//   { title: "Learn New Techs", statusCode: "1" },
// ];
// //#endregion

// //#region Create Todo List Item
// const createTodoLI = (todo) => `<li
//           class="list-group-item d-flex justify-content-between align-items-center"
//         >
//           <div class="col-md-5">
//             <span class="todoName">${todo.title}</span>
//           </div>

//           <div class="col-md-7 d-flex justify-content-start">
//                 <span class="badge bg-danger currentStatus mx-1">${getStatus(todo.statusCode).status
//   }</span>
//                 <select class="form-control statusSelect mx-1">
//                   <option value="0" selected disabled>Status</option>
//                   <option value="2">In progress</option>
//                   <option value="3">Done</option>
//                 </select>
//                 <i class="far fa-trash-alt delete py-2 mx-1"></i>
//           </div>
//         </li>`;
// //#endregion

// //#region Bind Todos To Dom
// // دي بتستقبل ليستة و بتعيد رسمها في الصفحة
// const BindTodosToDom = (todos) => {
//   todosUL.innerHTML = todos.map(createTodoLI).join("");
// };

// const BindSingleTodo = (todo) => {
//   todosUL.innerHTML += createTodoLI(todo);
// };
// //#endregion

// //#region Search Todos
// const searchTodos = (todoSearchText, list) => {
//   let FilteredTodos = list.filter((todo) =>
//     todo.title.toLowerCase().includes(todoSearchText.toLowerCase())
//   );
//   BindTodosToDom(FilteredTodos);
// };
// //#endregion

// //#region Evaluate Status
// const getStatus = (statusCode) =>
//   statusCode === "1"
//     ? { status: "Not started", color: "bg-danger" }
//     : statusCode === "2"
//       ? { status: "In progress", color: "bg-primary" }
//       : { status: "Done", color: "bg-success" };
// //#endregion


// //#region Generate Options
// const generateOptions = (selectedStatusCode) =>
//   selectedStatusCode === "1"
//     ? `<option value="0" selected disabled>Status</option>
//                   <option value="2">In progress</option>
//                   <option value="3">Done</option>`
//     : selectedStatusCode === "2"
//       ? `<option value="0" selected disabled>Status</option>
//                   <option value="1">To do</option>
//                   <option value="3">Done</option>`
//       : `<option value="0" selected disabled>Status</option>
//                   <option value="1">To do</option>
//                   <option value="2">In progress</option>`;
// //#endregion

// //#region Functions Calls
// BindTodosToDom(todosList);
// //#endregion

// //#region Events Handlers
// window.addEventListener("DOMContentLoaded", () => {
//   const todosUL = document.getElementById("todosUL");
//   const searchForm = document.getElementById("searchForm");
//   const searchText = document.getElementById("searchText");
//   const addForm = document.getElementById("addForm");
//   const addText = document.getElementById("addText");
//   if (searchForm) {
//     searchForm.addEventListener("submit", (e) => {
//       e.preventDefault();
//       let searchedText = searchText.value;
//       searchTodos(searchedText, todosList);
//     });
//   }
//   if (addForm) {
//     addForm.addEventListener("submit", (e) => {
//       e.preventDefault();
//       let addedText = addText.value;
//       let newTodo = { title: addedText, statusCode: "1" };
//       if (addedText.trim().length > 0) {
//         todosList.push(newTodo);
//         BindSingleTodo(newTodo);
//       }
//       addText.value = "";
//     });
//   }
//   if (todosUL) {
//     todosUL.addEventListener("click", (e) => {
//       if (e.target.classList.contains("delete")) {
//         let todoToBeDeleted = e.target
//           .closest("li")
//           .getElementsByTagName("span")[0].innerHTML;
//         e.target.closest("li").remove();
//         let indexToBeDeleted = todosList.findIndex(
//           (todo) => todo.title === todoToBeDeleted
//         );
//         todosList.splice(indexToBeDeleted, 1);
//       }
//     });

//     todosUL.addEventListener("change", (e) => {
//       if (e.target.classList.contains("statusSelect")) {
//         let selectedStatus = e.target.value;
//         e.target.innerHTML = generateOptions(selectedStatus);
//         let newStatus = getStatus(selectedStatus);
//         e.target.previousElementSibling.innerHTML = newStatus.status;
//         e.target.previousElementSibling.className = `badge currentStatus mx-1 ${newStatus.color}`;
//       }
//     });
//   }
// });
// //#endregion











//#region  intial data source

let todosList;
if (localStorage.todos != `[]`) {
  todosList = JSON.parse(localStorage.todos)

}
else todosList = [
  { title: "Play Tennis", statusCode: "1", fav: 0 },
  { title: "Deliver JS Assignment", statusCode: "1", fav: 0 },
  { title: "Learn New Techs", statusCode: "1", fav: 0 },
];




//#endregion



const ChangeColorOfHeart = (number) =>
  number === 1 ? `style ="color: red ;"` : `style = "color :white ;" `



const createTodoLI = (todo) => `<li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <div class="col-md-5">
            <span class="todoName">${todo.title}</span>
          </div>

          <div class="col-md-7 d-flex justify-content-start">
                <span class="badge ${getStatus(todo.statusCode).color} currentStatus mx-1">${getStatus(todo.statusCode).theStatus}</span>
                <select class="form-control statusSelect mx-1">
                ${statusOptions(todo.statusCode)}
               
              </select>

              <i class=" heart fa fa-sharp fa-solid fa-heart  py-2  mx-2  " ${ChangeColorOfHeart(todo.fav)} ></i>
             
                <i class="far fa-trash-alt delete py-2 mx-3"></i>

          </div>
        </li>`;



//#region bind intial data source to dom
const BindTodosToDom = (todo) =>
  todosUL.innerHTML = todo.map(createTodoLI).join("")

//#endregion

const bindSingleTodo = (todo) =>
  todosUL.innerHTML += (createTodoLI(todo))


//#region search todos function
const searchTodos = (list, text) => {
  let searchedTodo = list.filter((todo) => todo.title.toUpperCase().includes(text.toUpperCase()));
  if (searchedTodo.length === 0) {

    // todosUL.innerHTML = `<div class="text-center text-light my-4"> There Are No Todos With This Name <div> `;

    todosUL.className = "list-group todos mx-auto text-light d-none"
    mxmx.className = "noTodosText alert alert-danger "

  }
  else BindTodosToDom(searchedTodo);
}
//#region Events Handelers
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let searchedText = searchText.value.trim();


  if (searchedText.length > 0) {
    searchTodos(todosList, searchedText);
    searchText.value = ""
  }


})


addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let addedText = addText.value.trim();
  if (addedText.length > 0) {
    todosList.push({ title: addedText, statusCode: "1", fav: 0 });
    bindSingleTodo({ title: addedText, statusCode: "1", fav: 0 });
    addText.value = ""


    localStorage.setItem("todos", JSON.stringify(todosList))
  }
})


todosUL.addEventListener("click", (e) => {

  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
    let deletedTodoTitle = e.target.parentElement.previousElementSibling.childNodes[1].innerHTML;
    let removedTodo = todosList.filter(todo => todo.title.includes(deletedTodoTitle))[0];
    let index = todosList.indexOf(removedTodo);
    todosList.splice(index, 1)


    localStorage.todos = JSON.stringify(todosList)  // new
  }

})


//#region function to determine options of select

const statusOptions = (number) =>
  number === "1" ?
    `<option value="0" selected disabled>Status</option>
<option value="2">In progress</option>
<option value="3">Done</option>`

    : number === "2" ?
      ` <option value="0" selected disabled>Status</option>
<option value="1" class="hidden">To do</option>
<option value="3">Done</option>`
      : ` <option value="0" selected disabled>Status</option>
    <option value="1" class="hidden">To do</option>
    <option value="2">In progress</option>` ;
//#endregion



const getStatus = (number) =>
  number === "1" ?
    { theStatus: "Not Started", color: "bg-danger", num: "1" }
    : number === "2" ?
      { theStatus: "In progress", color: "bg-primary", num: "2" }

      : { theStatus: "Done", color: "bg-success", num: "3" };


todosUL.addEventListener("change", (e) => {
  if (e.target.classList.contains("statusSelect")) {
    let statusValue = e.target.value;
    // console.log(statusValue);
    e.target.innerHTML = statusOptions(statusValue);
    e.target.previousElementSibling.innerHTML = getStatus(statusValue).theStatus;

    let newStatus = getStatus(statusValue);
    e.target.previousElementSibling.className = `badge currentStatus mx-1 ${newStatus.color}`

    let todoText = e.target.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML
    let indexOfTodo = todosList.indexOf(todosList.filter(o => o.title === todoText)[0])
    todosList[indexOfTodo].statusCode = getStatus(statusValue).num


    localStorage.todos = JSON.stringify(todosList)  //new
  }


});

BindTodosToDom(todosList);



window.addEventListener("DOMContentLoaded", () => {
  const todosUL = document.getElementById("todosUL")
  const searchForm = document.getElementById("searchForm")
  const searchText = document.getElementById("searchText")
  const addForm = document.getElementById("addForm")
  const addText = document.getElementById("addText")

  const btnAll = document.getElementById("btnAll")
  const mxmx = document.querySelector("noTodosText")


})

//   new 12/11/2023 the date of add
const favbtn = document.getElementById("favbtn")


btnAll.addEventListener("click", () => {
  todosUL.className = "list-group todos mx-auto text-light "
  mxmx.className = "noTodosText alert alert-danger d-none"
  BindTodosToDom(todosList)
})

localStorage.setItem("redcolor", "red")
localStorage.setItem("whitecolor", "white")


let favElements = [];
todosUL.addEventListener("click", (e) => {
  if (e.target.classList.contains("heart")) {
    //e.target.style.color = "red"

    let textOfTodo = e.target.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML
    let fullTodo = JSON.parse(localStorage.todos).filter(e => e.title.includes(textOfTodo))[0]

    if (fullTodo.fav === 0) {
      fullTodo.fav = 1;
      e.target.style.color = localStorage.redcolor


    } else {
      fullTodo.fav = 0;
      e.target.style.color = localStorage.whitecolor
    }


    favElements.push(fullTodo)
    console.log(fullTodo);
    console.log(fullTodo.fav);


  }
  //
  // }


})

favbtn.addEventListener("click", () => {
  BindTodosToDom(favElements)
  console.log(favElements);

})
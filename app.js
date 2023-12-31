
// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert")
const form = document.querySelector(".grocery-form")
const grocery = document.getElementById("grocery")
const submitBtn = document.querySelector(".submit-btn")
const container = document.querySelector(".grocery-container")
const list = document.querySelector(".grocery-list")
const clearBtn = document.querySelector(".clear-btn")
// edit option
let editElement;
let editFlag = false;
let editId = "";

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener('submit',addItem);
//clear items
clearBtn.addEventListener("click", clearItems)

// ****** FUNCTIONS **********
function addItem(e) {
    e.preventDefault();
    const value = grocery.value

    
    const id = new Date().getTime().toString()
    if (value && !editFlag) {
        console.log("add item to the list");
        const element = document.createElement(`article`)
        //add class
        element.classList.add(`grocery-item`)
        //add id
        const attr = document.createAttribute('data-id')
        attr.value = id
        element.setAttributeNode(attr)
        element.innerHTML = `  <p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>`;
            let deleteBtn = element.querySelector(".delete-btn")
            let editBtn = element.querySelector(".edit-btn")
            deleteBtn.addEventListener('click', deleteItem)
            editBtn.addEventListener('click', editItem)
    // append child
    list.appendChild(element)
    //disply alert
    displyAlert("item added to the list", "success")
    // show container
    container.classList.add("show-container")
    // add back to default
    setBackToDefault()
    }else if (value && editFlag) {
        editElement.innerHTML = value;
        displyAlert("value changed", "success")
        // edit back to defult
        editLocalStorage(editId,value)
        setBackToDefault();
    }else {
        displyAlert("please enter value", "danger")
    }
}
//disply alert
function displyAlert(text, action) { 
    alert.textContent = text
    alert.classList.add(`alert-${action}`)

    setTimeout(function () {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`)
    },1500)
}
//clear items 
function clearItems(){
    const items = document.querySelectorAll(".grocery-item");

    if (items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item);
        })
    }
    container.classList.remove("show-container");
    displyAlert("empty list", "danger")
    setBackToDefault();
    //localStorage.removeItem('list');
}
// delete function
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    let id = element.dataset.id
    list.removeChild(element);
    if (list.children.length == 0) {
        container.classList.remove("show-container")
    }
    displyAlert("item removed", "danger")
    setBackToDefault()
    removeFromLocalStorage(id)
}
//edit function
function editItem(e) {
     const element = e.currentTarget.
     parentElement.parentElement;
    //set edit item
    editElement = e.currentTarget.parentElement.
    previousElementSibling;
    //set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id; 
    submitBtn.textContent = "edit";


}
// set back to default
 function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editId = "";
    submitBtn.textContent = "submit";
 }
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
    const grocery = {id, value }
    let items = localStorage.getItem("list")? JSON.parse(localStorage.getItem("list")): [];
    console.log(items);

    items.push(grocery)
    localStorage.setItem("list", JSON.stringify(items))
}
// function removeFromLocalStorage(id){ 
    
// }
function removeFromLocalStorage(id) {}
function editLocalStorage(id, value) {}
// ****** SETUP ITEMS **********
 
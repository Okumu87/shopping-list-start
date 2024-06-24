const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

//Display Items when page loads

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDom(item));

  checkUI();
}

//Adding items to shopping list

// functions

//adding list item

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  //validate Input

  if (newItem === "") {
    alert("Empty add item");
    return;
  }

  //check for edit mode

  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
    //avoiding double input entries
  } else {
    if (checkIfItemExists(newItem)) {
      alert("This item already exists ");
      return;
    }
  }

  //Create list item

  // const li = document.createElement("li");
  // li.appendChild(document.createTextNode(newItem));

  // const button = createButton("remove-item btn-link text-red");

  // li.appendChild(button);

  // //Add li to the DOM

  // itemList.appendChild(li);

  //checkUI for li.value
  //

  //create item Dom element

  addItemToDom(newItem);

  //add to local storage
  addItemToStorage(newItem);

  checkUI();
  itemInput.value = "";
}

//add Item to Local storage

function addItemToDom(item) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");

  li.appendChild(button);

  //Add li to the DOM

  itemList.appendChild(li);

  //checkUI for li.value
}

//Add item to storage

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  //add new item to array

  itemsFromStorage.push(item);

  //covert to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}
//get items from storage
function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

//on click item

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);

    //edit stat
  } else {
    setItemToEdit(e.target);
  }
}

//function not to input double items

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

//edit stat function

function setItemToEdit(item) {
  isEditMode = true;

  //removing stat from items that are not being edited
  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));
  item.classList.add("edit-mode");
  //addBtn
  formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = "#228B22";
  itemInput.value = item.textContent;
}

//removing function

function removeItem(item) {
  if (confirm("Are you sure?")) {
    // Remove item from Dom
    item.remove();

    //Remove item from storage

    removeItemFromStorage(item.textContent);
  }
}

//remove item from storage

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  //Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  //reset to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

//clearing function

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // clear from local storage
  localStorage.removeItem("items");

  //clear UI

  checkUI();
}

//filterItems function

function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

//Clearing UI state clear all button and filter input

function checkUI() {
  //clearing input after edit

  itemInput.value = "";

  //to take new items define value.li in the function scope
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }

  // After editing UI reset of formBtn

  formBtn.innerHTML = '<i class = "fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#333";

  isEditMode = false;
}

//initialize app

function init() {
  // Event Listeners

  //adding items

  itemForm.addEventListener("submit", onAddItemSubmit);

  //removing items

  itemList.addEventListener("click", onClickItem);

  //clearing items
  clearBtn.addEventListener("click", clearItems);

  //filtering added li
  itemFilter.addEventListener("input", filterItems);

  //running function when page loads

  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

// init app global scope function

init();

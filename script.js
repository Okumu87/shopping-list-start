const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

//Adding items to shopping list

// functions

//adding list item

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  //validation

  if (newItem === "") {
    alert("Empty add item");
    return;
  }

  //Create list item

  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");

  li.appendChild(button);

  //Add li to the DOM

  itemList.appendChild(li);

  //checkUI for li.value

  checkUI();
  itemInput.value = "";
}

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

//removing function

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    //to confirm delete li
    if (confirm("are you sure ")) {
      e.target.parentElement.parentElement.remove();

      //clear UI

      checkUI();
    }
  }
}

//clearing function

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

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
  //to take new items define value.li in the function scope
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}

// Event Listeners

//adding items

itemForm.addEventListener("submit", addItem);

//removing items

itemList.addEventListener("click", removeItem);

//clearing items
clearBtn.addEventListener("click", clearItems);

//filtering added li
itemFilter.addEventListener("input", filterItems);

//running function when page loads

checkUI();

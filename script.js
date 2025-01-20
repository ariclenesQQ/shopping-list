const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemlist = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));

  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  novoItem = itemInput.value.trim();

  // Validar Input
  if (novoItem === "") {
    alert("Por favor adicione um item");
    return;
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemlist.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(novoItem)) {
      alert("Item já existe");
      return;
    }
  }

  addItemToDOM(novoItem);
  addItemToStorage(novoItem);

  checkUI();

  itemInput.value = "";
}

function addItemToDOM(item) {
  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const botao = criarBotao("remove-item btn-link text-red");
  li.appendChild(botao);

  itemlist.appendChild(li);
}

function criarBotao(classes) {
  const botao = document.createElement("button");
  botao.className = classes;
  const icone = criarIcone("fa-solid fa-xmark");
  botao.appendChild(icone);

  return botao;
}

function criarIcone(classes) {
  const icone = document.createElement("i");
  icone.className = classes;
  return icone;
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(item);

  // Save array to storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else { 
    setItemToEdit(e.target);
  }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) { 
  isEditMode = true;

  itemlist.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));

  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
}

function removeItem(item) {
  if (confirm("Tem certeza que deseja remover esse item?")) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to remove
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function limparList() {
  if (confirm("Tem certeza que deseja limpar a lista?")) {
    while (itemlist.firstChild) {
      itemlist.removeChild(itemlist.firstChild);
    }

    localStorage.removeItem('items');
  }

  checkUI();
}

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const itens = document.querySelectorAll("#item-list li");

  itens.forEach((item) => {
    const itemName = item.firstChild.textContent.toLocaleLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkUI() {
  itemInput.value = "";
  const itens = document.querySelectorAll("#item-list li");

  if (itens.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }

  formBtn.innerHTML = '<i class"fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';


  isEditMode = false;
}

// Initialize app
function init() {
  // Event Listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemlist.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", limparList);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemlist = document.getElementById('item-list');


function addItem(e) {
    e.preventDefault();

    novoItem = itemInput.value.trim();

    // Validar Input
    if (novoItem === '') {
        alert('Por favor adicione um item');
        return;
    }
    
    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(novoItem));

    const botao = criarBotao('remove-item btn-link text-red');
    li.appendChild(botao);

    itemlist.appendChild(li);

    itemInput.value = '';
}


function criarBotao(classes) {
    const botao = document.createElement('button');
    botao.className = classes;
    const icone = criarIcone('fa-solid fa-xmark');
    botao.appendChild(icone);

    return botao;
}

function criarIcone(classes) {
    const icone = document.createElement('i');
    icone.className = classes;
    return icone;
}


// Event Listeners
itemForm.addEventListener('submit', addItem);
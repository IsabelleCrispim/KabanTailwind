//criar as const
//1.add items en las colunas; 
//2.salvar o items no local storage 
//3. retornar se a algo local storage; 
//4.criar li;
//5. add funcionalidades para os botoes + add e save item; 
//6 customer scroll


//buttons
const addBtn = document.querySelectorAll('.add-btn');
const saveBtn = document.querySelectorAll('.add-btn-save');
const addContainer = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');

let updataonLoad = false;
let dragging = false;
//Item
const dragList = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlogList');
const progressList = document.getElementById('progressList');
const completeList = document.getElementById('completeList');
const onHoldList = document.getElementById('onHoldList');

/*Initialisar Array */
let backlogArray = [];
let progressArray = [];
let completeArray = [];
let onHoldArray = [];
let arrayAll = [];

var elementItem;
var draggedItem;
var currentColumn;

const namesArray = ['backlog', 'progress', 'complete', 'onHold'];

/*Create Element*/
function createElLi(collumnUl, column, itemLi, index) {
    /* console.log('collumnUl:', collumnUl);
     console.log('index:', index);
     console.log('itemLi:', itemLi);
     console.log('item:', item);*/
    elementItem = document.createElement('li');
    elementItem.classList.add('m-3', 'p-3', 'bg-yellowyellow', 'bg-opacity-45', 'text-darkdark', 'leading-6', 'font-semibold', 'h-fit', 'cursor-pointer', 'rounded', 'tracking-tighter');
    elementItem.textContent = itemLi;
    elementItem.draggable = true;
    elementItem.setAttribute('ondragstart', 'drag(event)');
    elementItem.contentEditable = true;
    elementItem.id = index;
    elementItem.setAttribute('onfocusout', `updateItem(${column}, ${index})`);
    collumnUl.appendChild(elementItem);
}

function drag(e) {
    dragging = true;
    draggedItem = e.target;
    console.log('draggedItem:', draggedItem);
}

function allowDrop(e) {
    e.preventDefault();
}

function dragEnter(index) {
    dragList[index].classList.add('p-4', 'bg-yellow-200');
    currentColumn = index;
}

function drop(e) {
    e.preventDefault();
    dragList.forEach((element) => {
        element.classList.remove('p-4', 'bg-yellow-200');
    });
    
    /*add item to collumn*/
    const parent = dragList[currentColumn];
    parent.appendChild(draggedItem);
    rebuildArray();
    updateColumnList();
    dragging = false;
}

/*Local storage*/
function getSaveColumn() {
    if (localStorage.getItem('backlogList')) {
        backlogArray = JSON.parse(localStorage.backlogList);
        progressArray = JSON.parse(localStorage.progressList);
        completeArray = JSON.parse(localStorage.completeList);
        onHoldArray = JSON.parse(localStorage.onHoldList);
    } else {
        backlogArray = ['Recoger los materiales', 'echar papeles en la basura'];
        progressArray = ['Meditation', 'yoga'];
        completeArray = ['review', 'check data'];
        onHoldArray = ['relax'];
    }
}

/*updateColumn*/
function updateColumnList() {
    arrayAll = [backlogArray, progressArray, completeArray, onHoldArray];

    namesArray.forEach((element, index) => {
        localStorage.setItem(`${element}List`, JSON.stringify(arrayAll[index]));
    });
}

function updateDom() {
    if (!updataonLoad) {
        getSaveColumn();
        updataonLoad = true;
    }
    // this going to allow us to put the right  items into the right collumn; 
    backlogList.textContent = '';
    backlogArray = backlogArray.filter(item => item !== null);
    backlogArray.forEach((backlogItem, index) => {
        createElLi(backlogList, 0, backlogItem, index);
    });
    progressList.textContent = '';
    progressArray = progressArray.filter(item => item !== null);
    progressArray.forEach((progressItem, index) => {
        createElLi(progressList, 1, progressItem, index);
    });
    completeList.textContent = '';
    completeArray = completeArray.filter(item => item !== null);
    completeArray.forEach((completeItem, index) => {
        createElLi(completeList, 2, completeItem, index);
    });
    onHoldList.textContent = '';
    onHoldArray = onHoldArray.filter(item => item !== null);
    onHoldArray.forEach((onHoldItem, index) => {
        createElLi(onHoldList, 3, onHoldItem, index);
    });
    updateColumnList();
}
//Rebuild Arrays 

function rebuildArray() {
    backlogArray = Array.from(backlogList.children).map((li) => {
        return li.textContent;
    });
    progressArray = Array.from(progressList.children).map((li) => {
        return li.textContent;

    });
    completeArray = Array.from(completeList.children).map((li) => {
        return li.textContent;
    });
    onHoldArray = Array.from(onHoldList.children).map((li) => {
        return li.textContent;
    });
    console.log(backlogArray);
    console.log(progressArray);
    console.log(completeArray);
    console.log(onHoldArray);
}
//addItems
function showInputBox(index) {
    addBtn[index].classList.add('hidden');
    saveBtn[index].classList.remove('hidden');
    addContainer[index].classList.remove('hidden');
}

function hideInputBox(index) {
    addBtn[index].classList.remove('hidden');
    saveBtn[index].classList.add('hidden');
    addContainer[index].classList.add('hidden');
    addToColumn(index);
}

function addToColumn(index) {
    let addText = addItems[index].textContent;
    let selectedArray = arrayAll[index];
    selectedArray.push(addText);
    addItems[index].textContent = '';
    updateDom();
    console.log(selectedArray);
}

function updateItem(column, id) {
    if (!dragging) {
        let selectedArray = arrayAll[column];
        let selectedColumnEl = dragList[column].children;
        if (!selectedColumnEl[id].textContent) { // ! quer  dizer que no existe ; 
            delete selectedArray[id];
        } else {
            selectedArray[id] = selectedColumnEl[id].textContent;
        }
        updateDom();
    }
}




updateDom();
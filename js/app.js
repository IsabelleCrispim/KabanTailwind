//criar as const
//1.add items en las colunas; 
//2.salvar o items no local storage 
//3. retornar se a algo local storage; 
//4.criar li;
//5. add funcionalidades para os botoes + add e save item; 
//6 customer scrooll


//buttons
const addBtn = document.querySelectorAll('.add-btn');
const saveBtn = document.querySelectorAll('.add-btn-save');
const addContainer = document.querySelectorAll('.add-container');
//Item
const dragList = document.querySelectorAll('.drag-list');
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



/*Create Element*/
/*Local storage*/
function getSaveColumn() {
    if (localStorage.getItem('backlogList')) {
        backlogArray = JSON.parse(localStorage.backlogList);
        progressArray = JSON.parse(localStorage.progressList);
        completeArray = JSON.parse(localStorage.completeList);
        onHoldArray = JSON.parse(localStorage.onHoldList);
        console.log("working");

    } else {
        backlogArray = ['Recoger los materiales', 'echar papeles en la basura'];
        progressArray = ['Meditation', 'yoga'];
        completeArray = ['review', 'check data'];
        onHoldArray = ['relax'];
        console.log('workingtoo');

    }
}

/*updateColumn*/
function updateColumnList() {
    arrayAll = [backlogArray, progressArray, completeArray, onHoldArray];
    let namesArray = ['backlog', 'progress', 'complete', 'onHoldArray'];

    namesArray.forEach((element, index) => {
            localStorage.setItem(`${element}List`, JSON.stringify(arrayAll[index]));
        });

    
};




    getSaveColumn();
    updateColumnList();
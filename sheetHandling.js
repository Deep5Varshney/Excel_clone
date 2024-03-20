let activeColor ="#ced6e0";
let sheetsFolderCont = document.querySelector(".sheets-folder-cont");
let addSheetbtn = document.querySelector(".sheet-add-icon");
addSheetbtn.addEventListener("click",(e) => {
   let sheet = document.createElement("div");
   sheet.setAttribute("class","sheet-folder");

   let allsheetsFolder = document.querySelectorAll(".sheet-folder");
   sheet.setAttribute("id",allsheetsFolder.length);

   sheet.innerHTML=`
   <div class="sheet-content">sheet ${allsheetsFolder.length +1}</div>
   `;
   sheetsFolderCont.appendChild(sheet);
   sheet.scrollIntoView();
   createSheetDB();
   createGraphComponentMatrix();
   handleSheetActiveness(sheet);
   handleSheetRemoval(sheet);
   sheet.click();
})

function handleSheetRemoval(sheet) {
    sheet.addEventListener("mousedown",(e) => {
        if(e.button !== 2){
            return;
        }
        let allsheetsFolder = document.querySelectorAll(".sheet-folder");
        if(allsheetsFolder.length === 1){
            alert("You need to have atleast one sheet!!");
            return;
        }

        let response = confirm("Your sheets will be removed permanently. Are you sure?");
        if(response === false){
            return;
        }
        let sheetIdx = Number(sheet.getAttribute("id"));
        collectedSheetDB.splice(sheetIdx,1);
        collectedGraphComponent.splice(sheetIdx,1);
        handleSheetRemovalUI(sheet);

        sheetDB = collectedSheetDB[0];
        graphComponentMatrix = collectedGraphComponent[0];
        handleSheetproperties();
    })
}

function handleSheetRemovalUI(sheet){
    sheet.remove();
    let allsheetsFolder = document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allsheetsFolder.length;i++){
        allsheetsFolder[i].setAttribute("id",i);
        let sheetContent = allsheetsFolder[i].querySelector(".sheet-content");
        sheetContent.innerText = `sheet${i+1}`;
        allsheetsFolder[i].style.backgroundColor = "transparent";
    }
    allsheetsFolder[0].style.backgroundColor =activeColor;
}

function handleSheetDB(sheetIdx){
    sheetDB = collectedSheetDB[sheetIdx];
    graphComponentMatrix = collectedGraphComponent[sheetIdx];
}

function handleSheetproperties(){
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
        }
    }
    let firstCell = document.querySelector(".cell");
    firstCell.click(); 
}

function handleSheetUI(sheet){
    let allsheetsFolder = document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allsheetsFolder.length;i++){
        allsheetsFolder[i].style.backgroundColor = "transparent";
    }
    sheet.style.backgroundColor = activeColor;
}

function handleSheetActiveness(sheet){
    sheet.addEventListener("click",(e) => {
        let sheetIdx = Number(sheet.getAttribute("id"));
        handleSheetDB(sheetIdx);
        handleSheetproperties();
        handleSheetUI(sheet);
    })
}


function createSheetDB(){
    let sheetDB =[];
for(let i=0;i<rows;i++){ // here all the variables of excel can be accessed
    let sheetRow=[];
    for(let j=0;j<cols;j++){
        let cellProp={
            bold:false,
            italic:false,
            alignment:"left",
            fontFamily:"Monospace",
            fontSize:"14",
            fontColor:"#000000",
            BGColor:"#000000",
            value:"",
            formula:"",
            children:[]
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}
collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix(){
    let graphComponentMatrix =[];

for(let i = 0; i <rows;i++){
    let row=[];
    for(let j = 0; j <cols;j++){
        //more than 1 child dependency
        row.push([]);
    }
    graphComponentMatrix.push(row);
}
collectedGraphComponent.push(graphComponentMatrix);
}
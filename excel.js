let rows=100;
let cols=26;

let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-col");
let cellcont = document.querySelector(".cells-cont");
let addressbar = document.querySelector(".address-bar");

for(let i=0;i<rows;i++){
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class", "address-col");
    addressCol.innerText=i+1;
    addressColCont.appendChild(addressCol);
}

for(let i=0;i<cols;i++){
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class", "address-row");
    addressRow.innerText=String.fromCharCode(65+i);
    addressRowCont.appendChild(addressRow);
}

for(let i=0;i<rows;i++){
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class", "row-cont");
    for(let j=0;j<cols;j++){
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("spellcheck","false")
        cell.setAttribute("contenteditable", "true");
        // Attributes for cell and storage identification
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j);
        rowCont.appendChild(cell); // In 1 row we have inserted 26 cells
        addListenerForAddressBarDisplay(cell,i,j);
    }

    cellcont.appendChild(rowCont);
}

function addListenerForAddressBarDisplay(cell,i,j){
    cell.addEventListener("click",(e)=>{
        let rowId = i+1;
        let colId = String.fromCharCode(65+j);
        addressbar.value=`${colId}${rowId}`;
    })
}

// by default to click first cell
//let firstCell = document.querySelector(".cell");
//firstCell.click(); // It is clicked internally through DOM
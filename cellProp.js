// storage 
let collectedSheetDB=[];
let sheetDB =[];

{
    let addSheetbtn = document.querySelector(".sheet-add-icon");
    addSheetbtn.click();
}
// for(let i=0;i<rows;i++){ // here all the variables of excel can be accessed
//     let sheetRow=[];
//     for(let j=0;j<cols;j++){
//         let cellProp={
//             bold:false,
//             italic:false,
//             alignment:"left",
//             fontFamily:"Monospace",
//             fontSize:"14",
//             fontColor:"#000000",
//             BGColor:"#000000",
//             value:"",
//             formula:"",
//             children:[]
//         }
//         sheetRow.push(cellProp);
//     }
//     sheetDB.push(sheetRow);
// }

// selectors for cell properties
let bold = document.querySelector(".fa-bold");
let italic = document.querySelector(".fa-italic");
let underline = document.querySelector(".fa-underline");
let fontSize=document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGColor = document.querySelector(".BGcolor-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centreAlign=alignment[1];
let rightAlign = alignment[2];
let addressBar = document.querySelector(".address-bar");
let activeColorProp ="#7f8fa6";
let inactiveColorProp = "#f1f2f6";


//Application of two-way binding
//Attach property listeners
bold.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell,cellProp]=activeCell(address);

    //Modification
    cellProp.bold = !cellProp.bold; // data change
    cell.style.fontWeight = cellProp.bold ? "bold":"normal";// UI change(1)
    bold.style.backgroundColor =cellProp.bold? activeColorProp : inactiveColorProp; // UI change(2)
   

});

italic.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell,cellProp]=activeCell(address);

    //Modification
    cellProp.italic = !cellProp.italic; // data change
    cell.style.fontStyle = cellProp.italic ? "italic":"normal";// UI change(1)
    italic.style.backgroundColor =cellProp.italic? activeColorProp : inactiveColorProp; // UI change(2)

});

underline.addEventListener("click", (e) => {
    let address = addressBar.value;
    let [cell,cellProp]=activeCell(address);

    //Modification
    cellProp.underline = !cellProp.underline; // data change
    cell.style.textDecoration = cellProp.underline ? "underline":"none";// UI change(1)
    underline.style.backgroundColor =cellProp.underline? activeColorProp : inactiveColorProp; // UI change(2)

});

fontSize.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell,cellProp]=activeCell(address);

    cellProp.fontSize = fontSize.value; // data change
    cell.style.fontSize = cellProp.fontSize+"px"; // UI change()
    fontSize.value = cellProp.fontSize;
});


fontFamily.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell,cellProp]=activeCell(address);

    cellProp.fontFamily = fontFamily.value; // data change
    cell.style.fontFamily = cellProp.fontFamily; // UI change()
    fontFamily.value = cellProp.fontFamily;
});

fontColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell,cellProp]=activeCell(address);

    cellProp.fontColor = fontColor.value; // data change
    cell.style.color = cellProp.fontColor; // UI change()
    fontColor.value = cellProp.fontColor;
});

BGColor.addEventListener("change", (e) => {
    let address = addressBar.value;
    let [cell,cellProp]=activeCell(address);

    cellProp.BGColor = BGColor.value; // data change
    cell.style.backgroundColor = cellProp.BGColor; // UI change()
    BGColor.value = cellProp.BGColor;
});

alignment.forEach((alignelem)=>{
    alignelem.addEventListener("click",(e)=>{
        let address = addressBar.value;
        let [cell,cellProp]=activeCell(address);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue; // data change
        cell.style.textAlign = cellProp.alignment; // UI changes

        switch(alignValue) {
            case "left":
                leftAlign.style.backgroundColor= activeColorProp;
                centreAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor= inactiveColorProp;
                centreAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor= inactiveColorProp;
                centreAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
        }

    })
});

let allCells = document.querySelectorAll(".cell");
for (let i = 0;i < allCells.length;i++) {
    addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell) {
    // Work
    cell.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [rid, cid] = decodeRIDCIDFromAddress(address);
        let cellProp = sheetDB[rid][cid];

        // Apply cell Properties
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor == "#000000" ? "transparent" : cellProp.BGcolor;
        cell.style.textAlign = cellProp.alignment;
                

        // Apply properties UI Props container
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontColor.value = cellProp.fontColor;
        BGColor.value = cellProp.BGcolor;
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;
        switch(cellProp.alignment) { // UI change (2)
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centreAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centreAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centreAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }

        let formulaBar = document.querySelector(".formula-bar");
        formulaBar.value = cellProp.formula;
        cell.innerText = cellProp.value;
    })
}


function activeCell(address) {
    let [rid, cid] = decodeRIDCIDFromAddress(address);
    // Access cell and storage obj
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return[cell,cellProp];
}

function decodeRIDCIDFromAddress(address){
    // address ->"A1"
    let rid = Number(address.slice(1)-1);//1->0  and to convert string into number
    let cid = Number(address.charCodeAt(0))-65;// "A" ->65
    return[rid, cid];
}
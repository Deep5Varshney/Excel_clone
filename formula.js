// Normal expression -> (10+10);
for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur",(e)=>{
            let address = addressBar.value;
            let [activecell, cellprop] = activeCell(address);
            let enteredData = activecell.innerText;

          
            cellprop.value = enteredData;
        })
    }
}

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown",async(e)=>{
    let inputFormula = formulaBar.value;
    if(e.key === "Enter" && inputFormula){
        let address = addressBar.value;
        let [cell, cellprop] = activeCell(address);

        if(inputFormula != cellprop.formula){
            removeChildFromParent(cellprop.formula);
        }
        

        addChildToGraphComponent(inputFormula, address);
        // Check the formula first, if it doesn't form any cycle, then evaluate this
            let cycleResponse = isGraphCyclic(graphComponentMatrix);
            if( cycleResponse){
               // alert("Your formula is cyclic");
              let response= confirm("Your formula is cyclic. Do you want to trace your path"); 
              while(response === true){
                // keep on tracking color untill user is satisfied
                await isGraphCyclicTracePath(graphComponentMatrix, cycleResponse);
                response= confirm("Your formula is cyclic. Do you want to trace your path"); 
              }
                removeChildFromGraphComponent(inputFormula, address);
                return;
            }

        let evaluatedvalue = evaluateFormula(inputFormula);

        setCellUIAndcellprop(evaluatedvalue, inputFormula, address);
        addChildToParent(inputFormula);
        updateChildrenCell(address);  // recursive function to update the cell
    }
})

function addChildToGraphComponent(formula,childaddress) {
    let [crid, ccid] = decodeRIDCIDFromAddress(childaddress);
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].push([crid, ccid]); // relationship is removed, if cycle is formed.
        }
    }
}

function removeChildFromGraphComponent(formula,childaddress) {
    let [crid, ccid] = decodeRIDCIDFromAddress(childaddress);
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++) {
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [prid, pcid] = decodeRIDCIDFromAddress(encodedFormula[i]);
            graphComponentMatrix[prid][pcid].pop();
        }
    }
}

function updateChildrenCell(parentAddress){
    let [parentcell, parentcellProp] = activeCell(parentAddress);
    let children = parentcellProp.children;

    for(let i=0;i<children.length;i++){
        let childaddress = children[i];
        let [childCell, childPropCell] = activeCell(childaddress);
        let childFormula = childPropCell.formula;
        let evaluatedValue =evaluateFormula(childFormula);
        setCellUIAndcellprop(evaluatedValue, childFormula, childaddress);
    }
}

function addChildToParent(formula){
    let childaddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [parentcell, parentcellProp] = activeCell(encodedFormula[i]);
            parentcellProp.children.push(childaddress)
        }
    }
}

function removeChildFromParent(formula){// in case formula is modified

    let childaddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [parentcell, parentcellProp] = activeCell(encodedFormula[i]);
            let idx = parentcellProp.children.indexOf(childaddress);
            parentcellProp.children.splice(idx, 1);
        }
    }
}

function evaluateFormula(formula){
    let encodedFormula = formula.split(" "); // dependency formula should be space separated
    for(let i = 0; i < encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [cell,cellProp] = activeCell(encodedFormula[i]);
            encodedFormula[i]=cellProp.value;
        }
    }
    let decodedformula = encodedFormula.join(" ");
    return eval(decodedformula);
}

function setCellUIAndcellprop(evaluatedvalue, formula, address){
    let [cell, cellprop] = activeCell(address);

    cell.innerText = evaluatedvalue;//UI update
    //data changed
    cellprop.value = evaluatedvalue;
    cellprop.formula = formula;

}
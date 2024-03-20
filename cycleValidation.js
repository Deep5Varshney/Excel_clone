// storage -> 2-D matrix
let collectedGraphComponent =[];
 let graphComponentMatrix =[];

// for(let i = 0; i <rows;i++){
//     let row=[];
//     for(let j = 0; j <cols;j++){
//         //more than 1 child dependency
//         row.push([]);
//     }
//     graphComponentMatrix.push(row);
// }
// True -> cyclic, false -> noncyclic
function isGraphCyclic(graphComponentMatrix){
    // Dependency -> visited, dfsvisited
    let visited = []; // Node visit trace
    let dfsvisited = []; // stack visit trace

    for(let i=0;i<rows;i++){
        let visitedRow =[];
        let dfsvisitedRow =[];
        for(let j=0;j<cols;j++){
            visitedRow.push(false);
            dfsvisitedRow.push(false);
        }

        visited.push(visitedRow);
        dfsvisited.push(dfsvisitedRow);
    }

    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            if(visited[i][j]===false){
                let response = dfsCycleDetection(graphComponentMatrix,i,j, visited, dfsvisited);
                if(response==true){
                    return [i,j];
                }
            }
            
        }
    }
    return null;
}
// start
function dfsCycleDetection(graphComponentMatrix, srcr, srcc, visited, dfsvisited){
    visited[srcr][srcc]= true;
    dfsvisited[srcr][srcc]= true;

    for(let children=0;children<graphComponentMatrix[srcr][srcc].length;children++){
       let [nbrr, nbrc] =graphComponentMatrix[srcr][srcc][children];
       if(visited[nbrr][nbrc] === false){
         let response=dfsCycleDetection(graphComponentMatrix, nbrr, nbrc, visited, dfsvisited);

         if(response === true){
            return true;
         }
       }

       else if
        (visited[nbrr][nbrc]===true && dfsvisited[nbrr][nbrc]===true){
            return true;
        }
       

    }
    dfsvisited[srcr][srcc]= false;
    return false;
}
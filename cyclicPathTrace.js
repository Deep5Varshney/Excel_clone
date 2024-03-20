function colorPromise(){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{ 
            resolve(); // setTimeOut -> async -> sync -> wrap S.T in promises
        },1000);
    })
}


async function isGraphCyclicTracePath(graphComponentMatrix, cycleResponse){
    let [srcr, srcc] = cycleResponse;
    let visited = []; 
    let dfsvisited = [];

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

    // for(let i=0;i<rows;i++){
    //     for(let j=0;j<cols;j++){
    //         if(visited[i][j]===false){
    //             let response = dfsCycleDetection(graphComponentMatrix,i,j, visited, dfsvisited);
    //             if(response==true){
    //                 return [i,j];
    //             }
    //         }
            
    //     }
    // }

    let response = await dfsCycleDetectionTracePath(graphComponentMatrix,srcr,srcc, visited, dfsvisited);
    if(response==true){
        return Promise.resolve(true);
    }
    return  Promise.resolve(false);
}

// coloring cell for tracking
async function dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsvisited){
    visited[srcr][srcc]= true;
    dfsvisited[srcr][srcc]= true;

    let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);
    
    cell.style.backgroundColor = "lightblue";
    await colorPromise(); // to track the color change

    for(let children=0;children<graphComponentMatrix[srcr][srcc].length;children++){
       let [nbrr, nbrc] =graphComponentMatrix[srcr][srcc][children];
       if(visited[nbrr][nbrc] === false){
         let response=await dfsCycleDetectionTracePath(graphComponentMatrix, nbrr, nbrc, visited, dfsvisited);

         if(response === true){
                cell.style.backgroundColor = "transparent";
                await colorPromise();
                return Promise.resolve(true);
         }
       }

       else if
        (visited[nbrr][nbrc]===true && dfsvisited[nbrr][nbrc]===true){
            cyclicCell = document.querySelector(`.cell[rid="${nbrr}"][cid="${nbrc}"]`);
                
            cyclicCell.style.backgroundColor = "lightsalmon";
           await colorPromise();
            cyclicCell.style.backgroundColor = "transparent";
            cell.style.backgroundColor = "transparent";
            await colorPromise();
           
            return Promise.resolve(true);
        }
       

    }
    dfsvisited[srcr][srcc]= false;
    return Promise.resolve(false);
}
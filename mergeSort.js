function mergeSort(array){
    // first and last array element values.
    let frstEl, lastEl;
    frstEl = array[0];
    lastEl = array[array.length-1];
    
    // two halves of the original array.
    let arrHalf1;
    let arrHalf2;

    if(array.length > 1){
        // if they aren't arrays of one elem, split and repeat.
        const mid = Math.floor((array.length-1)/2);
        const frstH = array.slice(0, mid + 1);
        const lastH = array.slice(mid + 1);
        arrHalf1 = mergeSort(frstH);
        arrHalf2 = mergeSort(lastH);
    }
    else{
        // returns the array if it is made of one element.
        return array;
    }

    // will merge the arrays returned by MergeSort.
   const mergedArr = merge(arrHalf1, arrHalf2);

    return mergedArr;
}

function merge(arr1, arr2){
// i is the arr1 index, j is the arr2 index, k is the mergedArr index.
    let i = 0;
    let j = 0 
    let k = 0;
    const mergedArr = [];

    while(i< arr1.length && j < arr2.length){
        if (arr1[i] < arr2[j]){
            mergedArr[k++] = arr1[i++]
        }
        else{
            mergedArr[k++] = arr2[j++]
        }
    }
    // copies any remaining elements (happens when arrays are not even).
    for(; i<arr1.length; i++){
        mergedArr[k++] = arr1[i]
    }
    for(; j<arr2.length; j++){
        mergedArr[k++] = arr2[j]
    }

    return mergedArr;
}


// // const arrTest = [100, 5, 4, 9, 400, 11, 2, 90];

// const mergeSortResult = mergeSort(arrTest);

// console.log(mergeSortResult);




// const arrtest = [1];
// const mid = Math.floor((arrtest.length-1)/2);
// console.log(mid);


// const frstH = arrtest.slice(0, mid+1);
// const lastH = arrtest.slice(mid+1);


// console.log(frstH);
// console.log(lastH);

// console.log(arrtest.slice(0, 1));
// console.log(arrtest);


// const arrTest1 = [3, 13];
// const arrTest2 = [4, 8, 12];

// const mergedArr = merge(arrTest1, arrTest2);
// console.log(mergedArr);



export {mergeSort, merge};

function fibs(number){
    const fibArray = [];

    for (i = 0; i<number; i++){
        if(i === 0){
            fibArray.push(0);
        }
        if(i === 1){
            fibArray.push(1);

        }
        if(i > 1){
            fibArray.push(fibArray[i-1] + fibArray[i-2]);
        }
    }
    console.log(fibArray);
}

// fibs(8);


function fibsRecursion(n) {
    if (n === 0){
        return 0;
    }
    if (n === 1){
        return 1;
    }
    else{
        return fibsRecursion(n-1)+fibsRecursion(n-2);
    }
}


function fibsRecursionIntoArray(number){
    const fibArray = [];
    for (let i = 0; i < number; i++){
        fibArray.push(fibsRecursion(i));
    }
    return fibArray;
}

const result = fibsRecursionIntoArray(8);

console.log(result);
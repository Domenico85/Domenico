const arr = [
    [-1,  4, -5, -9,  3 ],
    [ 6, -4, -7,  4, -5 ],
    [ 3,  5,  0, -9, -1 ],
    [ 1,  5, -7, -8, -9 ],
    [-3,  2,  1, -5,  6 ]
]

const elementLength = arr.length

for (let i = 0; i < elementLength; i++) {
    if(arr [i][i] < 0){
        arr[i][i] = 0;
    }else {
        arr[i][i] = 1;
    }
        
    }
    
console.log(arr);



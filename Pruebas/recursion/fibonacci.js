function fibonacci(num) {
  let answer = [];
  let x = 0;
  let y = 1;
  let z;

  answer.push(x);
  answer.push(y);

  let i = 2;
  while (i < num) {
    z = x + y;
    x = y;
    y = z;

    answer.push(z);
    i = i + 1;
  }
  return answer;
}

let num = 8;
answer = fibonacci(num);

console.log("Fibonacci series with iteration @ 8th term is: ", answer);

function fibsRec(number) {
  if (number === 1) return [0];
  if (number === 2) return [0, 1];

  let array = fibsRec(number - 1);

  array.push(array[array.length - 1] + array[array.length - 2]);

  return array;
}

let number = 8;
answer2 = fibsRec(number);

console.log("Fibonacci series with recursion @ 8th term is: ", answer2);

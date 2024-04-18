function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let firstNumber = "";
let secondNumber = "";
let operator = "";
let resultValue = "";

function logger() {

    console.log("firstNumber:", firstNumber);
    console.log("operator:", operator);
    console.log("secondNumber:", secondNumber);
}

function updateDisplayElements(type) {

    const display = document.getElementById('display')
        display.style.color = 'white';
        display.style.fontSize = '45px';
    if (type === 'clear') {
        display.value = ''
    }
    else if (type === 'not-valid') {
        display.style.color = 'red';
        display.style.fontSize = '23px';
        display.value = 'Division by zero, Nice try!';
        firstNumber = '';
        secondNumber = '';
        operator = '';
    } else {
        display.value = firstNumber + " " + operator + " " + secondNumber
    }
}
updateDisplayElements()

function inputNumber() {

    const buttonNumber = document.querySelectorAll('.number');
    buttonNumber.forEach(button => {
        button.addEventListener('click', function () {
            if (secondNumber === "" && operator === "") {

                firstNumber += button.value;

                if (button.value === '.' && firstNumber.split('.').length > 2) {

                    firstNumber = firstNumber.slice(0, -1);
                }

            } else {

                secondNumber += button.value;

                if (button.value === '.' && secondNumber.split('.').length > 2) {

                    secondNumber = secondNumber.slice(0, -1);
                }
            }
            logger();
            updateDisplayElements();
        });
    });
}

function resetCalculator() {
    updateDisplayElements('clear');
    firstNumber = "";
    secondNumber = "";
    operator = "";

}

function deleteLast() {
    if (secondNumber !== "") {
        secondNumber = secondNumber.slice(0, -1);
    } else if (operator !== "") {
        operator = "";
    } else if (firstNumber !== "") {
        firstNumber = firstNumber.slice(0, -1);
    }
    logger();
    updateDisplayElements();
}

function inputOperator() {
    const operatorButton = document.querySelectorAll('.operator');

    operatorButton.forEach(button => {
        button.addEventListener('click', function () {

            if (button.value === 'AC') {
                resetCalculator();

            } else if (button.value === 'DEL') {
                deleteLast();
            } else {
                operator = button.value;
            }
            logger();
            updateDisplayElements();
        });
    });

}

function calculateResult() {
    const equalButton = document.querySelector('#equals');
    equalButton.addEventListener('click', function () {
        if (firstNumber !== "" && operator !== "" && secondNumber !== "") {

            resultValue = operate(operator, firstNumber, secondNumber);

            if (typeof resultValue === 'number') {
                updateDisplayElements('clear');
                firstNumber = resultValue.toString();
                secondNumber = "";
                operator = "";
                updateDisplayElements();
                logger();
            }
        } else {
            resultValue = Math.round(resultValue * 1000) / 1000;

            updateDisplayElements('clear');
            firstNumber = resultValue.toString();
            secondNumber = "";
            operator = "";
            updateDisplayElements();
            logger();
        }
    });

}

function operate(operator, a, b) {
    a = parseFloat(a)
    b = parseFloat(b)

    switch (operator) {
        case '+':
            return add(a, b)
        case '-':
            return subtract(a, b)
        case '*':
            return multiply(a, b)
        case '/':
            if (b != 0) {
                return divide(a, b);
            } else {

                updateDisplayElements('not-valid');
            }
        default:
            return "Error";
    }
}

inputNumber();
inputOperator();
calculateResult();

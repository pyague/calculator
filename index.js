// globals
const btnNumber = document.querySelectorAll('.number'); //select all the number keys
const btnOperator =document.querySelectorAll('.operator'); //select all the number keys
const btnEqual = document.querySelector('.equal')
const buttonClear = document.querySelector('.clear');
const buttonDelete = document.querySelector('.delete')
const currentDisplay = document.querySelector('#current-operation');
const previousDisplay = document.querySelector('#previous-operation');
let calc = {num1: "", num2: "", operator: "", solution: ""};
let reset = false;

// OPERATIONS
// ----------

// basic operators
function add(x,y) {
    return x + y;
}
function subtract(x,y) {
    return x - y;
}
function multiply(x,y) {
    return x * y;
}
function divide(x,y) {
    return (x === 0 ? "ERROR" : x / y);
}

// master operate function using calc object
function operate() {
    switch (calc.operator) {
        case '+':  
            return roundDecimal(add(calc.num1, calc.num2), 4);
        case '-': 
            return roundDecimal(subtract(calc.num1, calc.num2), 4);
        case '*': 
            return roundDecimal(multiply(calc.num1, calc.num2), 4);
        case '/': 
            return roundDecimal(divide(calc.num1, calc.num2), 4);
        
        
    }
}

// add digit number to the display
function updateDisplay(num) {
    if (reset){currentDisplay.innerHTML = ""};
    if (num == "." && /\./.test(currentDisplay.innerHTML)) { //compara si tiene el punto ya puesto
        return;
    }
    currentDisplay.innerHTML += num;
    reset = false; // turn off display reset
}

// update displays when operator is selected
function operationSelect(op) {
    if (calc.num1 && currentDisplay.innerHTML) {
        calc.num1 = Number(currentDisplay.innerHTML);
        calc.num1 = operate();
        calc.operator = op;
        previousDisplay.innerHTML = calc.num1 + " " + op;
        currentDisplay.innerHTML = ""
    } else if (calc.num1) {
        calc.operator = op;
        previousDisplay.innerHTML = calc.num1 + " " + calc.operator;
    } else {
        calc.num1 = Number(currentDisplay.innerHTML);
        calc.operator = op;
        currentDisplay.innerHTML = "";
        previousDisplay.innerHTML = calc.num1 + " " + calc.operator;
    }
};

function completeCalc() {
    if (calc.num1 && currentDisplay.innerHTML && calc.operator) {
            calc.num2 = Number(currentDisplay.innerHTML)
            previousDisplay.innerHTML += " " + calc.num2
            currentDisplay.innerHTML = operate();
            calc = {};
            reset = true; // toggle display reset
        }
}


// EVENT LISTENERS
// ---------------

// add event listeners for digit buttons
btnNumber.forEach ((number) => {
    number.addEventListener('click' , function() {
        updateDisplay(parseFloat(number.value));
    });
});

// add event listeners for operator buttons

btnOperator.forEach((operator) => {
    operator.addEventListener('click', function() {
        operationSelect(operator.value)
    })
});

// event listener for equals button
btnEqual.addEventListener('click', function() {
    completeCalc();
});


// CLEAR FUNCTIONS
// -----------------
function clearAll() {
    previousDisplay.innerHTML = "" ;
    currentDisplay.innerHTML = "";
    calc = {};
    operation = "";
}

//clear all button press

buttonClear.addEventListener('click', function(){
    clearAll();
 })



function backspace() {
    currentDisplay.innerHTML = currentDisplay.innerHTML.slice(0, -1);
}
//Delete button press
buttonDelete.addEventListener('click', function() {
   backspace();
});


// keyboard support
document.addEventListener('keyup', e => {
    switch (e.key) {
        case "Backspace":
            backspace();
            break;
        case "Delete":
            clearAll();
            break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
        case ".":
            updateDisplay(e.key);
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            operationSelect(e.key);
            break;
        case "Enter":
            completeCalc();
            break;
    }
})

function roundDecimal(numero, decimales) {
    numeroRegexp = new RegExp('\\d\\.(\\d){' + decimales + ',}');   // Expresion regular para numeros con un cierto numero de decimales o mas
    if (numeroRegexp.test(numero)) {         // Ya que el numero tiene el numero de decimales requeridos o mas, se realiza el redondeo
        return Number(numero.toFixed(decimales));
    } else {
        return Number(numero.toFixed(decimales)) === 0 ? 0 : numero;  // En valores muy bajos, se comprueba si el numero es 0 (con el redondeo deseado), si no lo es se devuelve el numero otra vez.
    }
}
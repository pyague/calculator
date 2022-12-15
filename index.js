const btnNumber = document.querySelectorAll('.number'); 
const btnOperator =document.querySelectorAll('.operator'); 
const btnEqual = document.querySelector('.equal')
const buttonClear = document.querySelector('.clear');
const buttonDelete = document.querySelector('.delete')
const currentDisplay = document.querySelector('#current-operation');
const previousDisplay = document.querySelector('#previous-operation');
let calc = {num1: "", num2: "", operator: "", solution: ""};
let reset = false;

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


function updateDisplay(num) {
    if (reset){currentDisplay.innerHTML = ""};
    if (num == "0" && (currentDisplay.innerHTML == '0')){
        return
    }
    if (num === '.' && currentDisplay.innerHTML.includes('.')) return;
   
    currentDisplay.innerHTML += num;
    reset = false; 
}


function operationSelect(op) {
    if (calc.num1 && currentDisplay.innerHTML) {
        calc.num2 = Number(currentDisplay.innerHTML);
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
            reset = true;
        }
}


btnNumber.forEach ((number) => {
    number.addEventListener('click' , function() {
        updateDisplay(/* parseFloat */(number.value));
    });
});



btnOperator.forEach((operator) => {
    operator.addEventListener('click', function() {
        operationSelect(operator.value)
    })
});


btnEqual.addEventListener('click', function() {
    completeCalc();
});



function clearAll() {
    previousDisplay.innerHTML = "" ;
    currentDisplay.innerHTML = "";
    calc = {};
    operation = "";
}

buttonClear.addEventListener('click', function(){
    clearAll();
 })


function backspace() {
    currentDisplay.innerHTML = currentDisplay.innerHTML.slice(0, -1);
}

buttonDelete.addEventListener('click', function() {
   backspace();
});

function roundDecimal(num, decimal) {
    numRegexp = new RegExp('\\d\\.(\\d){' + decimal + ',}');   
    if (numRegexp.test(num)) {         
        return Number(num.toFixed(decimal));
    } else {
        return Number(num.toFixed(decimal)) === 0 ? 0 : num;  
    }
}

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


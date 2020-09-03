const div = document.querySelector("#display");
let operator = null;
let operandFirst = null;
let operandSecond = null;
let ifOperator = false;
let display = 0;
const regex = /[\d\+\-\.\/\*]/;

populateDisplay();
inputOperator();
clearDisplay();
inputEqual();
deleteNumber();
inputPercentage();
inputSign();
inputDecimal();



document.addEventListener("keydown", function(e) {
    let keynumber = e.key;
    if (regex.test(keynumber) || keynumber == "Enter" || keynumber == "Backspace") {
        const key = document.querySelector(`button[value="${e.key}"]`);
        key.click();}
}, true);

function inputEqual() {
    const equal = document.querySelector("#equal");
    equal.addEventListener("click", function(){
        if (!ifOperator && operandFirst != null) {
            operandSecond = Number(div.textContent);
            div.textContent = operate(operator, operandFirst, operandSecond);
            ifOperator = true;
            operator = null;
            operandFirst = null;
            operandSecond = null;
        }
    });
}

function inputDecimal() {
const decimal = document.querySelector("#point");
decimal.addEventListener("click", function(){
    if (ifOperator) {
        div.textContent = 0;
        ifOperator = false;
    };
    if (!div.textContent.includes(".")) {
        div.textContent += decimal.value;}
    });
}

function populateDisplay() {
    const operands = document.querySelectorAll(".operand");
    operands.forEach(btn => {
        btn.addEventListener("click", function() {    
        if (ifOperator || div.textContent == "0"){
            div.textContent = ""; 
            ifOperator = false;
        }
        if ((div.textContent.charAt(0) == "-" && div.textContent.length < 10) ||
            (div.textContent.length < 9)) {
                div.textContent += btn.value;
        } 
    });
    });
}

function inputOperator() {
    const operators = document.querySelectorAll(".operator");
    operators.forEach(btn => {
        btn.addEventListener("click", function() {
            //multiple clicks on operator button
            if (ifOperator && operator != null && operandSecond === null) operator = btn.value
            else {
            //calculation - 2nd click on operator button 
            if (operator != null && operandFirst != null) 
            {             
                operandSecond = Number(div.textContent);
                div.textContent = operate(operator, operandFirst, operandSecond);
                operandSecond = null;
            }
            operator = btn.value;
            operandFirst = Number(div.textContent);
            ifOperator = true; 
        }
        })
    });
}

function clearDisplay() {
    const clear = document.querySelector("#clear");
    clear.addEventListener("click", function() {
        div.textContent = 0;
        operandFirst = null;
        operandSecond = null;
        operator = null;
        ifOperator = false;
    })
}

function deleteNumber() {
    const del = document.querySelector("#delete");
    del.addEventListener("click", function(){
            let value = div.textContent;
            if (value != "Error") {
                if (value < 0 && value.length == 2){
                    div.textContent = value.slice(0,value.length-2);
                } else div.textContent = value.slice(0,value.length-1);
            
            }
    });
}

function operate(operator, a, b) {
    let result;
    if (isNaN(a) || isNaN(b)) result = "Error";
    else {
    switch (operator) {
        case "+":
            result = a+b;
            break;
        case "-":
            result = a-b;
            break;
        case "*":
            result = a*b;
            break;
        case "/":
            result = (b==0)?"Error":a/b;
            break;
        }   
    }
    if (result != "Error") {
        if (result%1 != 0) {
            result = roundResult(result);
        } else if (result.toString().length > 10) result = result.toExponential(6);
    };
    return result;
}

function inputPercentage() {
    const percent = document.querySelector("#percent");
    percent.addEventListener("click", function(){
        display = Number(div.textContent)
        div.textContent = roundResult(display/100);
        operator = null;
    })
}

function inputSign() {
    const sign = document.querySelector("#sign");
    sign.addEventListener("click", function() {
        display = Number(div.textContent);
        if (display < 0 || display > 0) {
            display = -display;
            div.textContent = display;
        }
    }) 
}

function roundResult(result) {
    return (result*10e5).toFixed(5)/10e5;
}
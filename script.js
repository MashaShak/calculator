const div = document.querySelector("#display");
let operator = null;
let operandFirst = null;
let operandSecond = null;
let ifOperator = false;
let res = null;


populateDisplay();
calculate();
clearDisplay();
count();
deleteNumber();

function count() {
    const equal = document.querySelector("#equal");
    equal.addEventListener("click", function(){
        if (!ifOperator && operandFirst != null) {
            operandSecond = Number(div.textContent);
            res = operate(operator, operandFirst, operandSecond);
            operator = null;
            div.textContent = res;
            ifOperator = true;
        }
    });
}


function populateDisplay() {
    const operands = document.querySelectorAll(".operand");
    operands.forEach(btn => {
        btn.addEventListener("click", function() {
        //from second time
        if (ifOperator) {
            div.textContent = ""; 
            ifOperator = false;
        }
        div.textContent += btn.value;
        });
    });
}

function clearDisplay() {
    const clear = document.querySelector("#clear");
    clear.addEventListener("click", function() {
        div.textContent = "";
        operandFirst = null;
        operandSecond = null;
        operator = null;
        ifOperator = false;
    })
}

//work on double click on operands and other buttons - go through the flags and improve the logic 
function calculate() {
    const operators = document.querySelectorAll(".operator");
    operators.forEach(btn => {
        btn.addEventListener("click", function() {
            //first time 
            if (operator == null) 
            {
                operator = btn.value;
                operandFirst = Number(div.textContent);
                ifOperator = true;
            }
            //from second time 
            else if (operator != null && operandFirst != null) 
            {
                //calculate first, the start the next
               
                operandSecond = Number(div.textContent);
                res = operate(operator, operandFirst, operandSecond);
                div.textContent = res;
                operandFirst = res;
                operator = btn.value;
                ifOperator = true;
            }
            //if (ifOperator) {}

        })
    });
}
//work on Error message, work on the result, you can only delete when you enter numbers - so in entering numbers mode
function deleteNumber() {
    const del = document.querySelector("#delete");
    del.addEventListener("click", function(){
        let value = div.textContent;
        div.textContent = value.slice(0,value.length-1);
    });
}

function add(a,b) {
    return a+b;
}
function substract(a,b) {
    return a-b;
}
function multiply(a,b) {
    return a*b;
}
function divide(a,b) {
    if (b==0) return "Error";
    return a/b;
}

function operate(operator, a, b) {
    let result;
    if (isNaN(a) || isNaN(b)) result = "Error";
    else {
    switch (operator) {
        case "+":
            result = add(a,b);
            break;
        case "-":
            result = substract(a,b);
            break;
        case "*":
            result = multiply(a,b);
            break;
        case "/":
            result = divide(a,b);
            break;
        }   
    }
    return result;
}



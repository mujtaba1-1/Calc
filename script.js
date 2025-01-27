const output = document.getElementById("output-container");
let brackets = [];
const operators = ['+', '-', 'x', '÷'];

const getLastChar = () => output.textContent.charAt(output.textContent.length - 1);

const addToOutput = (button) => {
    if (button.textContent === "C") {
        output.textContent = "";
        brackets = [];
        return;
    }

    if (output.textContent.length === 15) {
        alert("Maximum limit reached");
        return;
    }
    
    const lastChar = getLastChar();

    if (lastChar === "%" || lastChar === ")") {
        output.textContent += "x";
    }

    output.textContent += button.textContent;
    return;
}

const addParenthesis = () => {
    const lastChar = getLastChar();

    if (output.textContent.length === 15) {
        alert("Maximum limit reached");
        return;
    }

    if (output.textContent.length === 0 || lastChar === "(" || operators.find(el => el === lastChar)) {
        output.textContent += "(";
        brackets.push("(");
    }
    else if (brackets.length > 0) {
        output.textContent += ")";
        brackets.pop();
    }
    else if (brackets.length === 0) {
        output.textContent += "x(";
        brackets.push("(");
    }
    
    return;
}

const addOperator = (button) => {
    const lastChar = getLastChar();
    const regex = /\d|\)/;

    if (output.textContent.length === 15) {
        alert("Maximum limit reached");
        return;
    }

    if (regex.test(lastChar)) {
        output.textContent += button.textContent;
    }
    else if (operators.find(el => el === lastChar)) {
        output.textContent = output.textContent.slice(0, -1)  + button.textContent;
    }
}

const addPoint = (button) => {
    const numbers = output.textContent.split(/[\+\-x÷]/);
    const lastChar = getLastChar();

    if (output.textContent.length === 15) {
        alert("Maximum limit reached");
        return;
    }

    if (!numbers[numbers.length - 1].includes(".") && !/\(|\)|\s/.test(lastChar)) {
        output.textContent += button.textContent;
    }
    return;
}


const calculate = () => {
    let expression = output.textContent
        .replace(/x/g, "*")
        .replace(/÷/g, "/")
        .replace(/%/g, "/100");

    try {
        let result = eval(expression);
        if (Number.isFinite(result)) {
            let [_, decimalPart] = result.toString().split(".");
            output.textContent = decimalPart && decimalPart.length > 5 
                ? parseFloat(result.toFixed(5)) 
                : result;
        } else {
            alert("Error");
            output.textContent = "";
        }
    } catch (error) {
        alert("Invalid expression");
    }
};

const deleteLastCharacter = () => {
    output.textContent = output.textContent.slice(0, -1);
};

document.getElementById("equals").addEventListener("click", calculate);

const buttons = Array.from(document.getElementsByClassName("button"));

document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        calculate();
        return;
    }
    else if (e.key === "Backspace") {
        deleteLastCharacter();
        return;
    }
    buttons.forEach(el => {
        if (e.key === el.textContent || 
            (e.key === "*" && el.textContent === "x") || 
            (e.key === "/" && el.textContent === "÷") ||
            (e.key === "(" && el.textContent === "( )") ||
            (e.key === ")" && el.textContent === "( )")) {
            el.click();
        }
    });
});

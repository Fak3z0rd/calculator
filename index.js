class Calculator {
    constructor(previousTextElement, currentTextElement) {
        this.previousTextElement = previousTextElement;
        this.currentTextElement = currentTextElement;
        this.clearAll();
    }

    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        return a / b;
    }

    operate() {
        let result;
        let a = parseFloat(this.previousOperand);
        let b = parseFloat(this.currentOperand);
        if (isNaN(a) || isNaN(b)) return;
        switch (this.operation) {
            case "+":
                result = this.add(a, b);
                break;
            case "-":
                result = this.subtract(a, b);
                break;
            case "/":
                result = this.divide(a, b);
                break;
            case "*":
                result = this.multiply(a, b);
                break;
            default:
                return;
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.operate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    clearAll() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    convertDisplayNumber(number) {
        let stringNumber = number.toString();
        let integerPart = parseFloat(stringNumber.split(".")[0]);
        let decimalPart = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerPart)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerPart.toLocaleString("en", { maximumFractionDigits: 0 });
        }

        if (decimalPart != null) {
            return `${integerDisplay}.${decimalPart}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentTextElement.textContent = this.convertDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousTextElement.textContent = `${this.convertDisplayNumber(this.previousOperand)} ${
                this.operation
            }`;
        } else {
            this.previousTextElement.textContent = "";
        }
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const clearAllButton = document.querySelector("[data-allclearAll]");
const previousTextElement = document.querySelector("[data-previous]");
const currentTextElement = document.querySelector("[data-current]");

const calculator = new Calculator(previousTextElement, currentTextElement);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.textContent);
        calculator.updateDisplay();
    });
});

clearAllButton.addEventListener("click", () => {
    calculator.clearAll();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});

equalButton.addEventListener("click", () => {
    calculator.operate();
    calculator.updateDisplay();
});

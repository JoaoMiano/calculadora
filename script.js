const previous = document.querySelector('#previous');
const current = document.querySelector('#current');
const buttons = document.querySelectorAll("#area-buttons button");


class Calculator {
    constructor(previousText, currentText) {
        this.previousText = previousText
        this.currentText = currentText
        this.currentOperation = ""
    }

    //adiciona o digito no diplay
    addDigit(digit) {

        //verifica se o numero ja possui casa decimal
        if (digit === "." && this.currentText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    //processamento das operações
    processOperation(operation) {
    // Se o display atual está vazio
    if (this.currentText.innerText === "" && operation === "CE") {
        // Se a operação é uma troca de operação
        if (this.previousText.innerText !== "") {
            this.changeOperation(operation);
        }
        return;
    }

    // Pegando o valor da prévia e o atual
    let previous = +this.previousText.innerText.split(" ")[0];
    let current = +this.currentText.innerText;
    let operationValue;

    switch (operation) {
        case "+":
            operationValue = previous + current;
            this.updateScreen(operationValue, operation, current, previous);
            break;
        case "-":
            operationValue = previous - current;
            this.updateScreen(operationValue, operation, current, previous);
            break;
        case "*":
            operationValue = previous * current;
            this.updateScreen(operationValue, operation, current, previous);
            break;
        case "/":
            if (current === 0) {
                alert("Não é possível dividir por zero!");
                return;}
            operationValue = previous / current;
            this.updateScreen(operationValue, operation, current, previous);
           
            break;
        case "DEL":
            this.delOperation()
            break;

        case "C":
            this.cOperation()
            break;

        case "CE":
            this.ceOperation()
            break;

        case "=":
            this.equalOperation()
            break;
        default:
            return;
        
    }

}


    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        if (operationValue === null) {
            this.currentText.innerText += this.currentOperation;
        } else {
            if (previous === 0) {
                operationValue = current;
            }

            this.previousText.innerText = `${operationValue} ${operation}`
            this.currentText.innerText = ""
        }
    }

    changeOperation(operation){
        const mathOperation = ["+","-","/","*"]
        if(!mathOperation.includes(operation)){
            return
        }

        this.previousText.innerText = this.previousText.innerText.slice(0, -1) + operation
    }
    //deleta o ultimo numero
    delOperation(){
        this.currentText.innerText = this.currentText.innerText.slice(0, -1)
    }
    //limpa o campo atual
    ceOperation(){
        this.currentText.innerText = "";
    }
    //limpa todos os campos
    cOperation(){
        this.currentText.innerText = "";
        this.previousText.innerText = "";
    }
    //Exibe o resultado
    equalOperation(){
        const operation = this.previousText.innerText.split(" ")[1];

        this.processOperation(operation)
        this.currentText.innerText = this.previousText.innerText.split(" ")[0];
        this.previousText.innerText = "";
    }
};

const calc = new Calculator(previous, current);


//Adiciona um evento para cada elemnto dentro do array buttons que retorna o valor do botão clicado
buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText;


        //verifica se o botão clicado é um numero ou uma operação
        if (+value >= 0 || value === ".") {
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }
    })
})
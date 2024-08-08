document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let operand1 = '';
    let operand2 = '';
    let expression = ''; // Store the full expression

    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const { num, operator: op, action } = button.dataset;

            if (num) {
                currentInput += num;
                expression += num; // Append number to the expression
                display.textContent = expression;
            }

            if (op) {
                if (currentInput !== '') {
                    operand1 = currentInput;
                    currentInput = '';
                    expression += ` ${op} `;
                    operator = op;
                    display.textContent = expression;
                }
            }

            if (action === 'clear') {
                currentInput = '';
                operand1 = '';
                operand2 = '';
                operator = '';
                expression = '';
                display.textContent = '0';
            }

            if (action === 'equals') {
                if (currentInput !== '') {
                    operand2 = currentInput;
                    const result = calculate(operand1, operand2, operator);
                    expression += ` = ${result}`;
                    display.textContent = expression;
                    currentInput = result;
                    operand1 = '';
                    operand2 = '';
                    operator = '';
                }
            }

            if (action === 'fraction') {
                if (currentInput !== '') {
                    const fractionResult = 1 / parseFloat(currentInput);
                    expression = `${fractionResult}`;
                    display.textContent = expression;
                    currentInput = fractionResult;
                }
            }
        });
    });

    function calculate(op1, op2, operator) {
        op1 = parseFloat(op1);
        op2 = parseFloat(op2);

        switch (operator) {
            case '+':
                return op1 + op2;
            case '-':
                return op1 - op2;
            case '*':
                return op1 * op2;
            case '/':
                return op1 / op2;
            default:
                return 0;
        }
    }
});
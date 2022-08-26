const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('.button');

let operands = [];
let operators = [];
let isNewNumber = true;

// calculate and output the result
function operate() {
  const operator = operators.shift();
  const num1 = operands.shift();
  const num2 = operands.shift();
  let result = 0;

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '÷':
      if (num2 == 0) {
        alert('Division by 0 is not valid.');
        break;
      };
      result = num1 / num2;
      break;
    default:
      break;
  };
  resultOverflow(result);
};

// add an operator to the que
function setOperator(operator) {
  operators.push(operator);
};

// add an operand to the que
function setOperand(number) {
  operands.push(Number(number));
};

// take care of the possible overflow of the result number
function resultOverflow(result) {
  if (String(result).length > 9) {
    screen.value = String(result.toExponential(4));
  } else {
    screen.value = String(result);
  };
};

// implements keyboard support
function keyboardSupport(event) {
  const key = document.querySelector(`.button[data-key="${event.keyCode}"]`);
  if (key) {
    key.click();
  };
};

window.addEventListener('keydown', keyboardSupport);

buttons.forEach(btn => {
  // event listener for number buttons
  if (btn.classList.contains('number')) {
    btn.addEventListener('click', () => {
      if (isNewNumber) {
        screen.value = btn.value;
      } else {
        screen.value += btn.value;
      };
      if (screen.value.length > 9) {
        screen.value = screen.value.slice(1);
      };
      isNewNumber = false;
    });
  };
  // event listener for operator buttons
  if (btn.classList.contains('operator')) {
    btn.addEventListener('click', () => {
      if (!isNewNumber) {
        setOperand(screen.value);
        setOperator(btn.value);
        if (operands.length ==  2) {
          operate();
          setOperand(screen.value);
        };
      } else {
        setOperand(screen.value);
        setOperator(btn.value);
      };
      isNewNumber = true;
    });
  };
  // event listener for special buttons
  if (btn.classList.contains('special')) {
    let value = btn.getAttribute('value');
    // clear button
    if (value == 'AC') {
      btn.addEventListener('click', () => {
        screen.value = 0;
        operators = [];
        operands = [];
        isNewNumber = true;
      });
    };
    // percent button
    if (value == '%') {
      btn.addEventListener('click', () => {
        const percent = String(Number(screen.value) / 100);
        if (operands.includes(screen.value)) {
          operands[operands.indexOf(screen.value)] = percent;
        } else {
          screen.value = percent;
        };
      });
    };
    // decimal button
    if (value == '.') {
      btn.addEventListener('click', () => {
        if (!screen.value.includes('.')) {
          screen.value += btn.value;
          isNewNumber = false;
        };
      });
    };
    // equals button
    if (value == '=') {
      btn.addEventListener('click', () => {
        if (!isNewNumber) {
          setOperand(screen.value);
          if (operands.length == 2) {
            operate();
            operators = [];
          };
        };
        isNewNumber = true;
      });
    };
  };
});

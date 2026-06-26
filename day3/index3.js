let display = document.getElementById('display');
let lastAnswer = 0;

function insert(value) {
  if (display.value === '0') display.value = '';
  display.value += value;
}

function clearDisplay() {
  display.value = '0';
}

function calculate() {
  let expression = display.value
    .replace(/π/g, Math.PI)
    .replace(/e/g, Math.E)
    .replace(/√\(/g, 'Math.sqrt(')
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/log\(/g, 'Math.log10(')
    .replace(/ln\(/g, 'Math.log(')
    .replace(/\^/g, '**');

  try {
    lastAnswer = eval(expression);
    display.value = lastAnswer;
  } catch {
    display.value = 'Error';
  }
}

function factorial() {
  let num = parseInt(display.value);
  if (isNaN(num) || num < 0) {
    display.value = 'Error';
    return;
  }
  let result = 1;
  for (let i = 1; i <= num; i++) result *= i;
  display.value = result;
}

function ans() {
  display.value += lastAnswer;
}

function toggleInv() {
  alert('Inverse functions can be added here!');
}

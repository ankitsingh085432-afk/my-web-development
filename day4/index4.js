let display = document.getElementById('display');
let premiumMsg = document.getElementById('premium-message');

function insert(value) {
  if (display.value === '0') display.value = '';
  display.value += value;
}

function calculate() {
  // Block calculation and show fixed premium message
  premiumMsg.textContent = "🚫 Calculation blocked! Unlock Pro Premium for ₹299/month or ₹1999/year.";
  display.value = "Pro Only";
}

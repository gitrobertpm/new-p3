/**
 * Form Functionality
 */
'user strict';

/**
 * Focus on name field
 */
const nameInput = document.querySelector('#name');
nameInput.focus();


/**
 * Job role 'Other' field
 */
const jobRoleMenu = document.querySelector('#title');
const otherJobRoleInput = document.querySelector('#other-job-role');

// Hide default option
jobRoleMenu.children[0].hidden = true;

// Hide 'Other' field 
otherJobRoleInput.style.opacity = 0;
otherJobRoleInput.style.display = 'none';

// Display/hide 'Other' field as needed
jobRoleMenu.addEventListener('change', e => {
  let op = 0;
  (e.target.value === 'other') ? op = 1 : op = 0;
  
  if (op === 1) {
    otherJobRoleInput.style.display = 'block';
  } else {
    setTimeout(() => {otherJobRoleInput.style.display = 'none'}, 500);
  }
  setTimeout(() => {otherJobRoleInput.style.opacity = op}, 100);
})


/**
 * T shirt section
 */
const designMenu = document.querySelector('#design');
const colorMenu = document.querySelector('#color');

// Hide default option
designMenu.children[0].hidden = true;

// Create and display temporary placeholder option for color menu
const placeholderOption = `<option selected hidden>Select a design theme</option>`;
colorMenu.insertAdjacentHTML('afterbegin', placeholderOption);

// Helper function for hiding all color options
const hideColors = () => [...colorMenu.children].forEach(option => option.hidden = true);
hideColors();

// Helper function for deselecting all color options
const deSelectColors = () => [...colorMenu.children].forEach(option => option.removeAttribute('selected'));

// Display/hide color options as needed
designMenu.addEventListener('change', e => {
  hideColors();
  deSelectColors();
  const thisVal = e.target.value;
  const firstColor = document.querySelectorAll(`#color option[data-theme="${thisVal}"]`)[0];
  [...colorMenu.children].forEach(color => {  
    if (thisVal === color.getAttribute('data-theme')) color.hidden = false;
    firstColor.setAttribute('selected', true);
  });
});


/**
 * Activity section
 */
const activitySection = document.querySelector('#activities');
const activities = document.querySelectorAll('.activities input');

// Add element to display cost
const totalCostElement = `<h3 id="activity-cost"></h3>`;
activitySection.insertAdjacentHTML('beforeend', totalCostElement);
const activityTotalCost = document.querySelector('#activity-cost');
let total = 0;

// Update total cost and disable/enable conflicting options
activitySection.addEventListener('change', e => {

  // Clicked input
  const clicked = e.target;

  // Cost of clicked input
  const cost = parseInt(clicked.getAttribute('data-cost'));

  // Update total cost
  clicked.checked ? total += cost : total -= cost;
  activityTotalCost.innerHTML = `Total: $${total}`;

  // Dat and time of clicked activity
  const dayAndTime = clicked.getAttribute('data-day-and-time');

  // Enable/disable conflicting activities
  for (let i = 0; i < activities.length; i++ ) {
    const dayAndTimeToCheck = activities[i].getAttribute('data-day-and-time');
    if (dayAndTime === dayAndTimeToCheck && clicked !== activities[i]) {
      clicked.checked ? activities[i].disabled = true : activities[i].disabled = false;
      clicked.checked ? activities[i].parentElement.style.background = 'rgba(197, 163, 175, 0.1)' : activities[i].parentElement.style.background = 'white';
    }
  }
});


/**
 * Payment section
 */
const paymentMethod = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin= document.querySelector('#bitcoin');

// Hide non-default sections
paypal.style.display = 'none';
paypal.style.opacity = 0;
bitcoin.style.display = 'none';
bitcoin.style.opacity = 0;

// Hide default option
paymentMethod.children[0].hidden = true;

// Select credit card by default
paymentMethod.children[1].setAttribute('selected', true);

const faeOut = (el) => {
  el.style.opacity = 0;
  setTimeout(e => { el.style.display = 'none' }, 350);
}

const fadeIn = (el) => {
  setTimeout(e => { el.style.display = 'block' }, 350);
  setTimeout(e => { el.style.opacity = 1 }, 400);
}

// Display/hide payment sections as needed
paymentMethod.addEventListener('change', e => {
  faeOut(creditCard);
  faeOut(paypal);
  faeOut(bitcoin);

  if (e.target.value === 'credit card') fadeIn(creditCard);
  if (e.target.value === 'paypal') fadeIn(paypal);
  if (e.target.value === 'bitcoin') fadeIn(bitcoin);
})


/**
 * Validation
 */
const name = document.querySelector('#name');
const mail = document.querySelector('#mail');
const activityLabels = document.querySelector('#activity-labels')
const ccNum = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');


// Name validation and real time test
const validName = () => {
  const valid = name.value.length > 0;
  valid ? name.style.borderColor = 'rgba(36, 28, 21, 0.3)' : name.style.borderColor = 'red';
  return valid;
}

name.addEventListener('keyup', e => {
  validName();
})


// Mail validation and real time test
const validMail = () => {
  const val = mail.value;
  const valid = val.length > 5 &&
                val.includes('@') &&
                val.includes('.') &&
                val.indexOf('@') > 0 &&
                val.indexOf('@') + 1 < val.lastIndexOf('.');
  valid ? mail.style.borderColor = 'rgba(36, 28, 21, 0.3)' : mail.style.borderColor = 'red';
  return valid;
}

mail.addEventListener('keyup', e => {
  validMail();
})


// Activity validation and real time test
const validActivity = () => {
  const valid = total > 0;
  valid ? activityLabels.style.borderColor = 'transparent' : activityLabels.style.borderColor = 'red';
  return valid;
}

activityLabels.addEventListener('change', e => {
  setTimeout(validActivity, 50);
})


// Credit card number validation and real time test
const validCC = () => {
  const val = ccNum.value;
  const valid = val.length > 12 &&
                val.length < 17 &&
                !isNaN(val); console.log(val.length);
  valid ? ccNum.style.borderColor = 'rgba(36, 28, 21, 0.3)' : ccNum.style.borderColor = 'red';
  return valid;
}

ccNum.addEventListener('keyup', e => {
  validCC();
})


// Zip validation and real time test
const validZip = () => {
  const val = zip.value;
  const valid = val.length === 5 &&
                !isNaN(val);
  valid ? zip.style.borderColor = 'rgba(36, 28, 21, 0.3)' : zip.style.borderColor = 'red';
  return valid;
}

zip.addEventListener('keyup', e => {
  validZip();
})


// CVV validation and real time test
function validCVV() {
  const val = cvv.value;
  const valid = val.length === 3 &&
                !isNaN(val);
  
  valid ? cvv.style.borderColor = 'rgba(36, 28, 21, 0.3)' : cvv.style.borderColor = 'red';
  return valid;
}

cvv.addEventListener('keyup', e => {
  validCVV();
})


// Form validation
const validForm = () => {
  const testArr = [validName(), validMail(), validActivity()];
  if (paymentMethod.value === 'credit card') {
    testArr.push(validCC());
    testArr.push(validZip());
    testArr.push(validCVV());
  }
  const notValidForm = testArr.some(val => !val);
  return !notValidForm;
}


// Submit handler
document.querySelector('form').addEventListener('submit', e => {
  // e.preventDefault();  
  if (!validForm()) e.preventDefault();
})
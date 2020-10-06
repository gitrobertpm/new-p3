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

// Create and display temporary placeholder option for color menu
const placeholderOption = `<option selected hidden>Select a design theme above</option>`;
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
const activityCost = document.querySelector('#activity-cost');

let total = 0;


// Accessibility - add tab index indicator to activity labels
[...activities].forEach((activity) => {
  activity.addEventListener('focus', e => {
    activity.parentElement.classList.add('focus');
  })

  activity.addEventListener('blur', e => {
    const active = document.querySelector('.focus');
    if (active) active.classList.remove('focus');
  })
});

// Update total cost and disable/enable conflicting options
activitySection.addEventListener('change', e => {

  // Clicked input
  const clicked = e.target;

  // Cost of clicked input
  const currentCost = parseInt(clicked.getAttribute('data-cost'));

  // Update total cost
  clicked.checked ? total += currentCost : total -= currentCost;
  activityCost.innerHTML = `Total: $${total}`;

  // Dat and time of clicked activity
  const dayAndTime = clicked.getAttribute('data-day-and-time');

  // Enable/disable conflicting activities
  for (let i = 0; i < activities.length; i++ ) {
    const dayAndTimeToCheck = activities[i].getAttribute('data-day-and-time');
    if (dayAndTime === dayAndTimeToCheck && clicked !== activities[i]) {
      clicked.checked ? 
      activities[i].disabled = true : 
      activities[i].disabled = false;

      clicked.checked ? 
      activities[i].parentElement.style.background = 'rgba(197, 163, 175, 0.1)' : 
      activities[i].parentElement.style.background = 'rgb(255, 253, 249)';
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

// Select credit card by default
paymentMethod.children[1].setAttribute('selected', true);


// Add fade in/out effect to payment sections
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

  if (e.target.value === 'credit-card') fadeIn(creditCard);
  if (e.target.value === 'paypal') fadeIn(paypal);
  if (e.target.value === 'bitcoin') fadeIn(bitcoin);
})


/**
 * Validation
 */
const name = document.querySelector('#name');
const nameLabel = document.querySelector('label[for="name"]');
const nameHint = document.querySelector('#name-hint');
const email = document.querySelector('#email');
const emailLabel = document.querySelector('label[for="email"]');
const emailHint = document.querySelector('#email-hint');
const activityLabels = document.querySelector('#activity-labels');
const activityHint = document.querySelector('#activity-hint');
const activityLegend = document.querySelector('#activities legend')
const ccNum = document.querySelector('#cc-num');
const ccLabel = document.querySelector('label[for="cc-num"]');
const ccHint = document.querySelector('#cc-hint');
const zip = document.querySelector('#zip');
const zipLabel = document.querySelector('label[for="zip"]');
const zipHint = document.querySelector('#zip-hint');
const cvv = document.querySelector('#cvv');
const cvvLabel = document.querySelector('label[for="cvv"]');
const cvvHint = document.querySelector('#cvv-hint');


// Name validation and real time test
const validName = () => {
  const valid = name.value.length > 0;
  if (valid) {
    name.style.borderColor = 'rgba(36, 28, 21, 0.3)';
    nameLabel.style.color = "rgb(0, 0, 0)";
    nameLabel.classList.add('valid');
    nameLabel.classList.remove('not-valid');
    nameHint.style.color = 'rgba(0, 0, 0, 0.8)';
    nameHint.textContent = 'Valid name';
  } else {
    name.style.borderColor = 'red';
    nameLabel.style.color = "red";
    nameLabel.classList.remove('valid');
    nameLabel.classList.add('not-valid');
    nameHint.style.color = 'red';
    nameHint.textContent = 'Name field cannot be blank';
  }
  return valid;
}

name.addEventListener('keyup', e => {
  validName();
})


// Mail validation and real time test
const validMail = () => {
  const val = email.value;
  const valid = val.length > 5 &&
                val.includes('@') &&
                val.includes('.') &&
                val.indexOf('@') > 0 &&
                val.indexOf('@') + 1 < val.lastIndexOf('.');

  if (valid) {
    email.style.borderColor = 'rgba(36, 28, 21, 0.3)';
    emailLabel.style.color = "rgb(0, 0, 0)";
    emailLabel.classList.add('valid');
    emailLabel.classList.remove('not-valid');
    emailHint.style.color = 'rgba(0, 0, 0, 0.8)';
    emailHint.textContent = 'Valid email';
  } else {
    email.style.borderColor = 'red';
    emailLabel.style.color = "red";
    emailLabel.classList.remove('valid');
    emailLabel.classList.add('not-valid');
    emailHint.style.color = 'red';
    emailHint.textContent = 'Email address must be formatted correctly';
  }
  // valid ? email.style.borderColor = 'rgba(36, 28, 21, 0.3)' : email.style.borderColor = 'red';
  return valid;
}

email.addEventListener('keyup', e => {
  validMail();
})


// Activity validation and real time test
const validActivity = () => {
  const valid = total > 0;
  if (valid) {
    activityLabels.style.borderColor = 'transparent';
    activityLegend.style.color = "rgb(0, 0, 0)";
    activityLegend.classList.add('valid');
    activityLegend.classList.remove('not-valid');
    activityHint.style.color = 'rgba(0, 0, 0, 0.8)';
    activityHint.textContent = 'Activity selected';
  } else {
    activityLabels.style.borderColor = 'red';
    activityLegend.style.color = "red";
    activityLegend.classList.remove('valid');
    activityLegend.classList.add('not-valid');
    activityHint.style.color = 'red';
    activityHint.textContent = 'Selecting at least one activity is required';
  }
  // valid ? activityLabels.style.borderColor = 'transparent' : activityLabels.style.borderColor = 'red';
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
  // valid ? ccNum.style.borderColor = 'rgba(36, 28, 21, 0.3)' : ccNum.style.borderColor = 'red';
  if (valid) {
    ccNum.style.borderColor = 'rgba(36, 28, 21, 0.3)';
    ccLabel.style.color = "rgb(0, 0, 0)";
    ccLabel.classList.add('valid');
    ccLabel.classList.remove('not-valid');
    ccHint.style.color = 'rgba(0, 0, 0, 0.8)';
    ccHint.textContent = 'Valid credit card number';
  } else {
    ccNum.style.borderColor = 'red';
    ccLabel.style.color = "red";
    ccLabel.classList.remove('valid');
    ccLabel.classList.add('not-valid');
    ccHint.style.color = 'red';
    ccHint.textContent = 'Credit card number must be between 13 - 16 digits';
  }
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
  // valid ? zip.style.borderColor = 'rgba(36, 28, 21, 0.3)' : zip.style.borderColor = 'red';
  if (valid) {
    zip.style.borderColor = 'rgba(36, 28, 21, 0.3)';
    zipLabel.style.color = "rgb(0, 0, 0)";
    zipLabel.classList.add('valid');
    zipLabel.classList.remove('not-valid');
    zipHint.style.color = 'rgba(0, 0, 0, 0.8)';
    zipHint.textContent = 'Valid Zip';
  } else {
    zip.style.borderColor = 'red';
    zipLabel.style.color = "red";
    zipLabel.classList.remove('valid');
    zipLabel.classList.add('not-valid');
    zipHint.style.color = 'red';
    zipHint.textContent = 'Zip Code must be 5 digits';
  }
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
  
  // valid ? cvv.style.borderColor = 'rgba(36, 28, 21, 0.3)' : cvv.style.borderColor = 'red';
  if (valid) {
    cvv.style.borderColor = 'rgba(36, 28, 21, 0.3)';
    cvvLabel.style.color = "rgb(0, 0, 0)";
    cvvLabel.classList.add('valid');
    cvvLabel.classList.remove('not-valid');
    cvvHint.style.color = 'rgba(0, 0, 0, 0.8)';
    cvvHint.textContent = 'Valid CVV';
  } else {
    cvv.style.borderColor = 'red';
    cvvLabel.style.color = "red";
    cvvLabel.classList.remove('valid');
    cvvLabel.classList.add('not-valid');
    cvvHint.style.color = 'red';
    cvvHint.textContent = 'CVV must be 3 digits';
  }
  return valid;
}

cvv.addEventListener('keyup', e => {
  validCVV();
})


// Form validation
const validForm = () => {
  const testArr = [validName(), validMail(), validActivity()];
  if (paymentMethod.value === 'credit-card') {
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
});

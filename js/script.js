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

// Disable color menu
colorMenu.disabled = true;

// Helper function for updating color options
const updateColors = theme => [...colorMenu.children]
      .forEach(option => (option.getAttribute('data-theme') === theme) ? 
      option.hidden = false : 
      option.hidden = true);

// Helper function for updating selected color options
const updateSelectedColors = (theme) => [...colorMenu.children]
      .forEach(option => (option.getAttribute('data-theme') === theme) ? 
      option.setAttribute('selected', true) : 
      option.removeAttribute('selected'));

// Display/hide color options as needed
designMenu.addEventListener('change', e => {
  colorMenu.disabled = false;
  updateColors(e.target.value);
  updateSelectedColors(e.target.value);
});


/**
 * Activity section
 */
const activitySection = document.querySelector('#activities');
const activities = document.querySelectorAll('.activities input');
const activitiesCost = document.querySelector('#activities-cost');

let total = 0;

// Update total cost and disable/enable conflicting options
activitySection.addEventListener('change', e => {

  // Clicked input
  const clicked = e.target;

  // Cost of clicked input
  const currentCost = parseInt(clicked.getAttribute('data-cost'));

  // Update total cost
  clicked.checked ? total += currentCost : total -= currentCost;
  activitiesCost.innerHTML = `Total: $${total}`;

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
      activities[i].parentElement.classList.add('disabled') : 
      activities[i].parentElement.classList.remove('disabled');
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
const fadeOut = el => {
  el.style.opacity = 0;
  setTimeout(e => { el.style.display = 'none' }, 350);
}

const fadeIn = el => {
  setTimeout(e => { el.style.display = 'block' }, 350);
  setTimeout(e => { el.style.opacity = 1 }, 400);
}

// Display/hide payment sections as needed
paymentMethod.addEventListener('change', e => {
  [creditCard, paypal, bitcoin].forEach(el => (e.target.value !== el.id) ? fadeOut(el) : fadeIn(el));
})


/**
 * Accessibility
 */
const hints = document.querySelectorAll('.hint');

// Add tab index focus indicator to activity labels
[...activities].forEach(activity => {
  activity.addEventListener('focus', e => {
    activity.parentElement.classList.add('focus');
  })

  activity.addEventListener('blur', e => {
    const active = document.querySelector('.focus');
    if (active) active.classList.remove('focus');
  })
});

// Accessibility related form input error validation indicators
const validationPass = el => {
  el.parentElement.classList.add('valid');
  el.parentElement.classList.remove('not-valid');
  el.parentElement.lastElementChild.style.display = 'none';
}

const validationFail = el => {
  console.log(el.parentElement.lastElementChild);
  el.parentElement.classList.remove('valid');
  el.parentElement.classList.add('not-valid');
  el.parentElement.lastElementChild.style.display = 'block';
}


/**
 * Validation
 */
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const activitiesBox = document.querySelector('#activities-box');
const ccNum = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');

// Helper function for validating form fields or sections
const validator = (el, test) => {
  const valid = test;
  (valid) ? validationPass(el) : validationFail(el);
  return valid;
}

// Real time validation listeners
name.addEventListener('keyup', e => validator(name, /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(name.value)));
email.addEventListener('keyup', e =>  validator(email, /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value)));
activitySection.addEventListener('change', e => validator(activitiesBox, total > 0));
ccNum.addEventListener('keyup', e => validator(ccNum, /^\d{13,16}$/.test(ccNum.value)));
zip.addEventListener('keyup', e => validator(zip, /^\d{5}$/.test(zip.value)));
cvv.addEventListener('keyup', e => validator(cvv, /^\d{3}$/.test(cvv.value)));


// Form validation
const validForm = () => {
  const testArr = [
    validator(name, /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(name.value)), 
    validator(email, /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value)), 
    validator(activitiesBox, total > 0)
  ];

  if (paymentMethod.value === 'credit-card') {
    testArr.push(validator(ccNum, /^\d{13,16}$/.test(ccNum.value)));
    testArr.push(validator(zip, /^\d{5}$/.test(zip.value)));
    testArr.push(validator(cvv, /^\d{3}$/.test(cvv.value)));
  }
  const notValidForm = testArr.some(val => !val);
  return !notValidForm;
}


// Submit handler
document.querySelector('form').addEventListener('submit', e => {
  // e.preventDefault();  
  if (!validForm()) e.preventDefault();
});

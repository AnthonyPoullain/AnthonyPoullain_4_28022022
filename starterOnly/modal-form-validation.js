// DOM Elements
const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");
const quantityInput = document.getElementById("quantity");
const conditionsInput = document.getElementById("checkbox1");
const formData = document.querySelectorAll(".formData");

// regex formats
const nameFormat = /^[a-z ,.'-]+$/i;
const emailFormat = /^\S+@\S+\.\S+$/;
const birthdateFormat = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
const quantityFormat = /^[0-9]+$/;

// validate input formats w/ regex
const firstNameIsValid = (firstName) =>
  firstName.toLowerCase().match(nameFormat) === null ? false : true;
const lastNameIsValid = (lastName) =>
  lastName.toLowerCase().match(nameFormat) === null ? false : true;
const emailIsValid = (email) =>
  email.toLowerCase().match(emailFormat) === null ? false : true;
const birthdateIsValid = (birthdate) =>
  birthdate.toLowerCase().match(birthdateFormat) === null ? false : true;
const quantityIsValid = (quantity) =>
  quantity.toLowerCase().match(quantityFormat) === null ? false : true;

// check fields and display errors if needed
function checkFirstName() {
  const firstName = firstNameInput.value;
  if (firstNameIsValid(firstName) && firstName.length > 2) {
    formData[0].setAttribute("data-error-visible", "false");
    return true;
  } else {
    formData[0].setAttribute("data-error-visible", "true");
    return false;
  }
}

function checkLastName() {
  const lastName = lastNameInput.value;
  if (lastNameIsValid(lastName) && lastName.length > 2) {
    formData[1].setAttribute("data-error-visible", "false");
    return true;
  } else {
    formData[1].setAttribute("data-error-visible", "true");
    return false;
  }
}

function checkEmail() {
  const email = emailInput.value;
  if (emailIsValid(email)) {
    formData[2].setAttribute("data-error-visible", "false");
    return true;
  } else {
    formData[2].setAttribute("data-error-visible", "true");
    return false;
  }
}

function checkBirthdate() {
  const birthdate = birthdateInput.value;
  if (birthdateIsValid(birthdate)) {
    formData[3].setAttribute("data-error-visible", "false");
    return true;
  } else {
    formData[3].setAttribute("data-error-visible", "true");
    return false;
  }
}

function checkQuantity() {
  const quantity = quantityInput.value;
  if (quantityIsValid(quantity)) {
    formData[4].setAttribute("data-error-visible", "false");
    return true;
  } else {
    formData[4].setAttribute("data-error-visible", "true");
    return false;
  }
}

function checkLocation() {
  const locationInput = document.querySelector(
    'input[name="location"]:checked'
  );
  if (locationInput != null) {
    formData[5].setAttribute("data-error-visible", "false");
    return true;
  } else {
    formData[5].setAttribute("data-error-visible", "true");
    return false;
  }
}

function checkConditions() {
  if (conditionsInput.checked) {
    formData[6].setAttribute("data-error-visible", "false");
    return true;
  } else {
    formData[6].setAttribute("data-error-visible", "true");
    return false;
  }
}

// form validation on input
firstNameInput.addEventListener("change", () => checkFirstName());
lastNameInput.addEventListener("change", () => checkLastName());
emailInput.addEventListener("change", () => checkEmail());
birthdateInput.addEventListener("change", () => checkBirthdate());
quantityInput.addEventListener("change", () => checkQuantity());
conditionsInput.addEventListener("change", () => checkConditions());

// form validation on submit
function validate() {
  if (
    checkFirstName() &&
    checkLastName() &&
    checkEmail() &&
    checkBirthdate() &&
    checkQuantity() &&
    checkLocation() &&
    checkConditions()
  ) {
    return true;
  } else {
    checkFirstName();
    checkLastName();
    checkEmail();
    checkBirthdate();
    checkQuantity();
    checkLocation();
    checkConditions();
    return false;
  }
}

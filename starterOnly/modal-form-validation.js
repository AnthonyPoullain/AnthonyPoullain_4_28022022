// DOM Elements
const formData = document.querySelectorAll(".formData");
const modalBody = document.querySelector(".modal-body");

// Input fields data
const fields = {
  firstName: {
    selector: "#first",
    regex: /^[a-z ,.'-]{2,}$/i,
    formDataIndex: 0, // Used to display error messages
  },
  lastName: {
    selector: "#last",
    regex: /^[a-z ,.'-]{2,}$/i,
    formDataIndex: 1,
  },
  email: {
    selector: "#email",
    regex: /^\S+@\S+\.\S+$/,
    formDataIndex: 2,
  },
  birthdate: {
    selector: "#birthdate",
    regex: /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
    formDataIndex: 3,
  },
  quantity: {
    selector: "#quantity",
    regex: /^[0-9]+$/,
    formDataIndex: 4,
  },
  location: {
    selector: ".formData:nth-child(7)",
    inputType: "radio",
    checkedRadio: "input[name='location']:checked",
    formDataIndex: 5,
  },
  conditions: {
    selector: "#checkbox1",
    inputType: "checkbox",
    formDataIndex: 6,
  },
};

function validateInput(input, regex) {
  return regex.test(input.value.toLowerCase());
}

function displayError(inputIsValid, formDataIndex) {
  // Sets the attribute data-error-visible to true or false depending on the value of inputIsValid.
  formData[formDataIndex].setAttribute("data-error-visible", `${inputIsValid ? "false" : "true"}`);
}

function displayThankYou() {
  // Displays a thank you message to the user.
  modalBody.innerHTML =
    "<p class='thankYou-text'>Merci pour<br>votre inscription</p><button onclick='closeModal()' class='button btn-submit'>Fermer</button>";
}

// Form validation on change
for (let i in fields) {
  let field = fields[i];

  if (field.inputType === "radio") {
    document
      .querySelector(field.selector)
      .addEventListener("click", () =>
        displayError(document.querySelector(field.checkedRadio), field.formDataIndex)
      );
  }

  if (field.inputType === "checkbox") {
    document
      .querySelector(field.selector)
      .addEventListener("change", () =>
        displayError(document.querySelector(field.selector).checked, field.formDataIndex)
      );
  }

  if (!field.inputType) {
    document
      .querySelector(field.selector)
      .addEventListener("change", () =>
        displayError(
          validateInput(document.querySelector(field.selector), field.regex),
          field.formDataIndex
        )
      );
  }
}

// form validation on submit
function validate() {
  let formIsValid = true;

  for (let i in fields) {
    let field = fields[i];
    if (field.inputType === "radio") {
      if (!document.querySelector(field.checkedRadio)) {
        displayError(false, field.formDataIndex);
        formIsValid = false;
      }
    }

    if (field.inputType === "checkbox") {
      if (!document.querySelector(field.selector)) {
        displayError(false, field.formDataIndex);
        formIsValid = false;
      }
    }

    // default
    if (!field.inputType) {
      if (!validateInput(document.querySelector(field.selector), field.regex)) {
        displayError(false, field.formDataIndex);
        formIsValid = false;
      }
    }
  }

  if (formIsValid) displayThankYou();
  return false;
}

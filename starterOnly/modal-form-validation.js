// DOM Elements
const formData = document.querySelectorAll('.formData')
const modalBody = document.querySelector('.modal-body')

// Input fields data
const fields = {
  firstName: {
    selector: '#first',
    regex: /^[a-z ,.'-]{2,}$/i,
  },

  lastName: {
    selector: '#last',
    regex: /^[a-z ,.'-]{2,}$/i,
  },

  email: {
    selector: '#email',
    regex: /^\S+@\S+\.\S+$/,
  },

  birthdate: {
    selector: '#birthdate',
    regex: /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/,
  },

  quantity: {
    selector: '#quantity',
    regex: /^[0-9]+$/,
  },

  location: {
    selector: '.formData:nth-child(7)',
    inputType: 'radio', // If no inputType, treated as a basic text input by default for validation
    checkedRadio: "input[name='location']:checked",
  },

  conditions: {
    selector: '#checkbox1',
    inputType: 'checkbox',
  },
}

function validateInput(input, regex) {
  return regex.test(input.value.toLowerCase())
}

function displayError(inputIsValid, formDataElement) {
  // Sets the attribute data-error-visible to true or false depending on the value of inputIsValid.
  formDataElement.setAttribute(
    'data-error-visible',
    `${inputIsValid ? 'false' : 'true'}`
  )
}

function displayThankYou() {
  // Displays a thank you message to the user.
  modalBody.innerHTML =
    "<p class='thankYou-text'>Merci pour<br>votre inscription</p><button onclick='closeModal()' class='button btn-submit'>Fermer</button>"
}

// Form validation on change
Object.values(fields).forEach((field, index) => {
  switch (field.inputType) {
    case 'radio':
      document
        .querySelector(field.selector)
        .addEventListener('click', () =>
          displayError(
            document.querySelector(field.checkedRadio),
            formData[index]
          )
        )
      break

    case 'checkbox':
      document
        .querySelector(field.selector)
        .addEventListener('change', () =>
          displayError(
            document.querySelector(field.selector).checked,
            formData[index]
          )
        )
      break

    default:
      document
        .querySelector(field.selector)
        .addEventListener('change', () =>
          displayError(
            validateInput(document.querySelector(field.selector), field.regex),
            formData[index]
          )
        )
  }
})

// form validation on submit
function validate() {
  let formIsValid = true

  Object.values(fields).forEach((field, index) => {
    switch (field.inputType) {
      case 'radio':
        if (!document.querySelector(field.checkedRadio)) {
          displayError(false, formData[index])
          formIsValid = false
        }
        break

      case 'checkbox':
        if (!document.querySelector(field.selector).checked) {
          displayError(false, formData[index])
          formIsValid = false
        }
        break

      default:
        if (
          !validateInput(document.querySelector(field.selector), field.regex)
        ) {
          displayError(false, formData[index])
          formIsValid = false
        }
    }
  })

  if (formIsValid) displayThankYou()
  return false
}

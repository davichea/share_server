// utils/validationMessages.js or utils/validation.js

const ValidationMessages = {
  REQUIRED: 'is required',
};

const getValidationMessage = (fieldName) => {
  return `${fieldName} ${ValidationMessages.REQUIRED}`;
};

export { getValidationMessage};

const yup = require("yup");

const validateUserSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("username is required")
    .min(4, "username must be between 4-16 characters")
    .max(16, "username must be between 4-16 characters"),
  password: yup
    .string()
    .trim()
    .required("password is required")
    .min(6, "password must be between 6-20 characters")
    .max(20, "password must be between 6-20 characters"),
  contact_info: yup
    .string()
    .trim()
    .required()
    .min(1, "contact_info is required")
    .max(24, "contact info must be between 1-24 characters"),
});

module.exports = {
  validateUserSchema,
};

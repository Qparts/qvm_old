import Joi from "joi-browser";

const validate = (data, schema) => {
  //console.log("validatinng ", data, schema);
  const result = Joi.validate(data, schema, { abortEarly: false });
  if (!result.error) return null;
  const errors = {};
  for (let item of result.error.details) {
    errors[item.path[0]] = item.message;
  }
  return errors;
};

const validateProperty = (input, schema) => {
  const obj = { [input.name]: input.value.toString().trim() };
  const fieldSchema = { [input.name]: schema[input.name] };
  if (fieldSchema[input.name] === null) return null;
  const { error } = Joi.validate(obj, fieldSchema);
  return error ? error.details[0].message : null;
};

const handleChangeAutoComplete = (name, value, schema, error, data) => {
  if (schema != null && schema[name] != null) {
    const obj = { [name]: value };
    const fieldSchema = { [name]: schema[name] };
    let errorMessage = null;
    if (fieldSchema[name] != null) {
      const { error } = Joi.validate(obj, fieldSchema);
      errorMessage = error ? error.details[0].message : null;
    }

    if (errorMessage) error[name] = errorMessage;
    else delete error[name];
  }
  data[name] = value;
};

const getFieldError = (input, schema, error) => {
  if (schema != null && schema[input.name] != null) {
    const errorMessage = validateProperty(input, schema);
    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];
  }
  return error;
};

const handleChange = (input, schema, error, data) => {
  if (schema[input.name] != null) {
    const errorMessage = validateProperty(input, schema);
    //    console.log("errorMessage", errorMessage);
    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];
  }
  data[input.name] = input.value.toString().trim();
  if (
    input.value.toString().trim() === null ||
    input.value.toString().trim() === ""
  )
    input.value = "";
};

export default {
  validate,
  validateProperty,
  getFieldError,
  handleChange,
  handleChangeAutoComplete,
};

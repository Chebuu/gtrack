const validateData = (data, schema) => {
  const anyInvalid = Object.keys(data).some((key) => {
    const argumentValue = Object.prototype.toString.call(data[key]);
    const schemaValue = Object.prototype.toString.call(new schema[key]());
    return argumentValue !== schemaValue;
  });
  return !anyInvalid;
};

module.exports = {
  validateData,
};

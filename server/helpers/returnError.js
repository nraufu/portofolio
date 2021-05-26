const returnError = (fields, res, schema, next) => {
    const { error } = schema.validate(fields);
    if (error) { return res.status(400).send({ status: 400, error: error.details[0].message }); }
    next();
}

export default returnError;

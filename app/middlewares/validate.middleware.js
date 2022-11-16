const Joi = require('joi')
const pick = require('../utils/pick')
const { validationErrorWithData } = require('../services/response.service')

const validate = (schema) => (req, res, next) => {
	const validSchema = pick(schema, ['params', 'query', 'body', 'file'])
	const object = pick(req, Object.keys(validSchema))
	const { value, error } = Joi.compile(validSchema)
		.prefs({ errors: { label: 'key' }, abortEarly: false })
		.validate(object)

	if (error) {
		const errorMessage = error.details.map((details) => details.message).join(', ')
		return next(validationErrorWithData(res, errorMessage))
	}
	Object.assign(req, value)
	return next()
}

module.exports = validate

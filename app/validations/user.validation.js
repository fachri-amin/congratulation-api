const Joi = require('joi').extend(require('@joi/date'))
var moment = require('moment-timezone')

const create = {
	body: Joi.object().keys({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required(),
		birthday: Joi.date().format('YYYY-MM-DD').required(),
		location: Joi.string()
			.required()
			.custom((value, helpers) => {
				if (!!moment.tz.zone(value)) return value
				else return helpers.message({ custom: 'Invalid location timezone' })
			}),
	}),
}

module.exports = {
	create,
}

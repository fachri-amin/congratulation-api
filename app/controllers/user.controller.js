const schedule = require('node-schedule')
var moment = require('moment-timezone')
const UserRepository = require('../repositories/user.repository')
const { successResponse, errorResponse } = require('../services/response.service')
const catchAsync = require('../utils/catchAsync')
const { sendEmailBirthday } = require('../services/sendEmail.service')

const create = catchAsync(async (req, res) => {
	const { body } = req
	const isEmailExist = await UserRepository.findOne({ where: { email: body.email } })
	if (isEmailExist) return errorResponse(res, 'Email already taken!')
	const birthday = moment(body.birthday).format('YYYY-MM-DD')
	body.birthday = birthday
	const userResult = await UserRepository.create(body)
	const tzBirthday = moment.tz(`${birthday} 22:43`, body.location).format()
	const utcBirthday = moment.utc(tzBirthday).format()
	schedule.scheduleJob(`birthday-${userResult.id}`, utcBirthday, function () {
		sendEmailBirthday(userResult.email)
	})
	return successResponse(req, res, 'Successfully create user', userResult)
})

const destroy = catchAsync(async (req, res) => {
	const {
		params: { id },
	} = req
	await UserRepository.destroy(id)
	schedule.cancelJob(`birthday-${id}`)
	return successResponse(req, res, 'Successfully create user')
})

module.exports = {
	create,
	destroy,
}

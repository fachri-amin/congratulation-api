const axios = require('axios')
const { EMAIL_SERVICE_ENDPOINT } = require('../../config/config')
const EventRepostory = require('../repositories/event.repository')
const SentHistoryRepostory = require('../repositories/sentHistory.repository')
const UserRepostory = require('../repositories/user.repository')

const sendEmailBirthday = async (email) => {
	const eventResult = await EventRepostory.findOne({ where: { name: 'birthday' } })
	const userResult = await UserRepostory.findOne({ where: { email } })
	const message = eventResult.text.replace('{fullName}', userResult.fullName)
	axios
		.post(EMAIL_SERVICE_ENDPOINT, {
			email,
			message,
		})
		.then(
			(res) => {
				SentHistoryRepostory.create({
					userId: userResult.id,
					eventId: eventResult.id,
				})
			},
			(err) => console.log('error', err),
		)
}

module.exports = {
	sendEmailBirthday,
}

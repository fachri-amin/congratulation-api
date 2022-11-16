const successResponse = (req, res, msg, data = []) => {
	const resData = {
		status: 1,
		message: msg,
		data,
	}

	return res.status(200).json(resData)
}

const errorResponse = (res, msg) => {
	const data = {
		status: 0,
		message: msg,
	}
	return res.status(500).json(data)
}

const notFoundResponse = (res, msg) => {
	const data = {
		status: 0,
		message: msg,
	}
	return res.status(404).json(data)
}

const validationErrorWithData = (res, msg, data) => {
	const resData = {
		status: 0,
		message: msg,
		data,
	}
	return res.status(400).json(resData)
}

const unauthorizedResponse = (res, msg = 'Unauthorized.') => {
	const data = {
		status: 0,
		message: msg,
	}
	return res.status(401).json(data)
}

module.exports = {
	successResponse,
	errorResponse,
	notFoundResponse,
	validationErrorWithData,
	unauthorizedResponse,
}

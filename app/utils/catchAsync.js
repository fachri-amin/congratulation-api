const { errorResponse } = require('../services/response.service')

const catchAsync = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch((error) => errorResponse(res, error.message))
}

module.exports = catchAsync

var express = require('express')
var router = express.Router()
const userController = require('../app/controllers/user.controller')
const validate = require('../app/middlewares/validate.middleware')
const userValidation = require('../app/validations/user.validation')

router.post('/', validate(userValidation.create), userController.create)
router.delete('/:id', userController.destroy)

module.exports = router

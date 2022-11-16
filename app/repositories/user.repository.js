const BaseRepository = require('./BaseRepository')
const { user } = require('../models')

class UserRepository extends BaseRepository {}

module.exports = new UserRepository(user)

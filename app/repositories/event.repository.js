const BaseRepository = require('./BaseRepository')
const { event } = require('../models')

class EventRepository extends BaseRepository {}

module.exports = new EventRepository(event)

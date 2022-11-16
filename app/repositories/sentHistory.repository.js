const BaseRepository = require('./BaseRepository')
const { sentHistory } = require('../models')

class SentHistoryRepository extends BaseRepository {}

module.exports = new SentHistoryRepository(sentHistory)

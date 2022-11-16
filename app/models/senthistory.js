'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class sentHistory extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.event, { foreignKey: 'eventId', as: 'event' })
			this.belongsTo(models.user, { foreignKey: 'userId', as: 'user' })
		}
	}
	sentHistory.init(
		{
			userId: DataTypes.INTEGER,
			eventId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'sentHistory',
			tableName: 'sent_histories',
			underscored: true,
		},
	)
	return sentHistory
}

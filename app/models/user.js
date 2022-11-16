'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class user extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.sentHistory, { foreignKey: 'userId', as: 'sentHistories' })
		}
	}
	user.init(
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			fullName: {
				type: DataTypes.VIRTUAL,
				get() {
					const firstName = this.getDataValue('firstName')
					const lastName = this.getDataValue('lastName')
					return `${firstName} ${lastName}`
				},
			},
			email: DataTypes.STRING,
			birthday: DataTypes.DATE,
			location: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'user',
			underscored: true,
		},
	)
	return user
}

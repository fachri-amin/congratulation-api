'use strict'

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		const now = new Date()
		queryInterface.bulkInsert(
			'events',
			[
				{
					name: 'birthday',
					text: "Hey, {fullName} it's your birthday",
					created_at: now,
					updated_at: now,
				},
			],
			{},
		)
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('events', { [Op.or]: [{ name: 'birthday' }] })
	},
}

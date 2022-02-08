const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
		},
		password: {
			type: String,
			require: true,
		},
		role: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Users', usersSchema)

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const machinesSchema = new mongoose.Schema(
	{
		machineId: {
			type: String,
			required: true,
		},
		deviceId: {
			type: String,
			required: true,
		},
		sessionId: {
			type: String,
			required: true,
		},
		used: {
			type: Number,
			default: 0,
		},
		createdDate: {
			type: Date,
			required: true,
		},
		lastUsedDate: {
			type: Date,
			default: Date.now,
		},
		note: {
			type: String,
			default: null,
		},
		tag: {
			type: String,
			default: null,
		},
	},
	{ timestamps: true }
)

machinesSchema.plugin(AutoIncrement, { inc_field: 'id_machine' })

module.exports = mongoose.model('Machines', machinesSchema)

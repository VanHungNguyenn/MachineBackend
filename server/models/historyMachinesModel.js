const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const historyMachinesSchema = new mongoose.Schema(
	{
		IP: {
			type: String,
			required: true,
		},
		computerName: {
			type: String,
			required: true,
		},
		machineId: {
			type: String,
			default: null,
		},
		verifySuccess: {
			type: Boolean,
			default: null,
		},
		registerSuccess: {
			type: Boolean,
			default: null,
		},
		email: {
			type: String,
			required: true,
		},
		emailPassword: {
			type: String,
			required: true,
		},
		UID: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		createdDate: {
			type: Date,
			required: true,
		},
		note: {
			type: String,
			default: null,
		},
		tag: {
			type: String,
			default: null,
		},
		elapsed: {
			type: Number,
			default: null,
		},
		beforeRegister: {
			type: Number,
			default: null,
		},
		beforeLogin: {
			type: Number,
			default: null,
		},
		beforeVerify: {
			type: Number,
			default: null,
		},
		twofa: {
			type: String,
			default: null,
		},
		token: {
			type: String,
			default: null,
		},
	},
	{ timestamps: true }
)

historyMachinesSchema.plugin(AutoIncrement, { inc_field: 'id_history' })

module.exports = mongoose.model('HistoryMachines', historyMachinesSchema)

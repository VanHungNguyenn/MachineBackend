const Machines = require('../models/machinesModel')

const machinesCtrl = {
	addMachine: async (req, res) => {
		try {
			const {
				machineId,
				deviceId,
				sessionId,
				used,
				createdDate,
				lastUsedDate,
				note,
				tag,
			} = req.body

			if (!machineId || !deviceId || !sessionId || !createdDate) {
				return res.status(400).json({
					msg: 'Please fill in all fields! (machineId, deviceId, sessionId, createdDate is required)',
				})
			}

			const newMachine = new Machines({
				machineId,
				deviceId,
				sessionId,
				used,
				createdDate,
				lastUsedDate,
				note,
				tag,
			})

			await newMachine.save()

			res.status(200).json({ msg: 'Machine has been added successfully' })
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	updateMachine: async (req, res) => {
		try {
			const { id } = req.params

			const {
				deviceId,
				sessionId,
				used,
				createdDate,
				lastUsedDate,
				note,
				tag,
			} = req.body

			await Machines.findOneAndUpdate(
				{ _id: id },
				{
					deviceId,
					sessionId,
					used,
					createdDate,
					lastUsedDate,
					note,
					tag,
				}
			).then((machine) => {
				if (!machine) {
					return res.status(200).json({ msg: 'Machine not found' })
				} else {
					res.status(200).json({ msg: 'Update successfully!' })
				}
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	deleteMachine: async (req, res) => {
		try {
			const { id } = req.params

			await Machines.findByIdAndDelete(id).then((machine) => {
				if (!machine) {
					return res.status(200).json({ msg: 'Machine not found' })
				} else {
					res.status(200).json({
						msg: 'Deleted machine successfully!',
					})
				}
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	getMachinesInfo: async (req, res) => {
		try {
			const { page, limit } = req.query

			const result = await Machines.find()
				.sort({ createdAt: 1 })
				.limit(limit ? Number(limit) : null)
				.skip(page ? (Number(page) - 1) * Number(limit) : null)

			res.status(200).json({ total: result.length, result })
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
	getInfo: async (req, res) => {
		try {
			const { tag, usedMax, usedMin, dateStart, dateEnd, page, limit } =
				req.query

			let conditions = {}

			if (tag) {
				conditions['tag'] = tag
			}

			if (usedMin || usedMax) {
				conditions['used'] = {}

				if (usedMin) {
					conditions.used['$gte'] = Number(usedMin)
				}

				if (usedMax) {
					conditions.used['$lte'] = Number(usedMax)
				}
			}

			if (dateStart || dateEnd) {
				conditions['createdDate'] = {}

				if (dateStart) {
					conditions.createdDate['$gte'] = new Date(dateStart)
				}
				if (dateEnd) {
					conditions.createdDate['$lte'] = new Date(dateEnd)
				}
			}

			const result = await Machines.find(conditions)
				.sort({ createdAt: -1 })
				.limit(limit ? Number(limit) : null)
				.skip(page ? (Number(page) - 1) * Number(limit) : null)

			const total_count_db = await Machines.find(conditions)

			res.status(200).json({
				total_count_db: total_count_db.length,
				total: result.length,
				result,
			})
		} catch (error) {
			return res.status(500).json({ msg: error.message })
		}
	},
}

module.exports = machinesCtrl

const router = require('express').Router()
const machinesCtrl = require('../controllers/machinesCtrl')
const authKey = require('../middlewares/authKey')
const auth = require('../middlewares/auth')

router.post('/add_machine', authKey, machinesCtrl.addMachine)
router.patch('/update/:id', authKey, machinesCtrl.updateMachine)
router.get('/delete/:id', authKey, machinesCtrl.deleteMachine)
router.get('/all_info', authKey, machinesCtrl.getMachinesInfo)
router.get('/info', authKey, machinesCtrl.getInfo)
router.get(function (req, res, next) {
	res.status(404).json({ msg: '404: File Not Found' })
})

module.exports = router

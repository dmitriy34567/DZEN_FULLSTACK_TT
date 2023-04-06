const Router = require('express')
const router = new Router()
const FilesController = require('../controllers/FilesController')

router.post('/', FilesController.create)
//router.get('/', FilesController.getFiles)

module.exports = router
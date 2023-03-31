const Router = require('express')
const router = new Router()
const CommentsController = require('../controllers/CommentsController')

router.post('/', CommentsController.create)
router.get('/', CommentsController.getAll)

module.exports = router
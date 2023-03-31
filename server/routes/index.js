const Router = require('express')
const router = new Router()
const commentsRouter = require('./commentsRouter')
const filesRouter = require('./filesRouter')



router.use('/comments', commentsRouter)
router.use('/file', filesRouter)

module.exports = router

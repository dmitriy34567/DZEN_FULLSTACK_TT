const uuid = require('uuid')
const path = require('path')
const {Comments} = require('../models/models')
const ApiError = require('../error/ApiError')


// старая версия без файлов и картинок 

class CommentsController {
    async create(req, res, next)
    {
        try {
            
        if (req.file !== undefined && req.file !== null) {
          const file = req.file
          const fileName = uuid.v4() + ".jpg"
          file.mv('../static/' + fileName, (err) => {
            if (err) {
              console.log(err)
            }
          })
          userFile = fileName
          console.log('file saved')
        }

        } catch (e) {

            next(ApiError.badRequest(e.message))

        }
        
    }


    async getAll(req, res, next)
    {
        try {
            const comments = await Comments.findAll()
            return res.json(comments)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

        
    }


}

    

module.exports = new CommentsController()


/*

class CommentsController {
    async create(req, res, next)
    {
        try {

            const { parantId, username, email, homePage, text, userImg, userPic, userFile } = req.body
            const comments = await Comments.create({parantId, username, email, homePage, text, userImg, userPic, userFile })
            return res.json(comments)

        } catch (e) {

            next(ApiError.badRequest(e.message))

        }
        
    }


    async getAll(req, res, next)
    {
        try {
            const comments = await Comments.findAll()
            return res.json(comments)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

        
    }
    

}

    

module.exports = new CommentsController()



*/
const multer = require('multer');
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')
const {Comments} = require('../models/models')

const storage = multer.diskStorage({
  destination: function (req, files, cb) {
    cb(null, 'static')
  },
  filename: function (req, files, cb) {
    const ext = path.extname(files.originalname)
    cb(null, uuid.v4() + ext)
  }
})

const fileFilter = function (req, files, cb) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'text/plain']
  if (!allowedTypes.includes(files.mimetype)) {
    const error = new Error('Wrong files type')
    error.code = 'LIMIT_FILE_TYPES'
    return cb(error, false)
  }
  cb(null, true)
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 102400 } // set maximum file size to 100 KB
});



const fs = require('fs');
if (!fs.existsSync('./static')) {
  fs.mkdirSync('./static');
}

class FilesController {
  async create (req, res, next) {
    try {
      if (!req.files) {
        return res.status(400).send('No file uploaded');
      }
      //res.json(req.files)
      const tempPath = req.files[0].path;
      const targetPath = './static/' + req.files[0].originalname;
  
      fs.rename(tempPath, targetPath, err => {
        if (err) {
          return next(ApiError.badRequest(err.message));
        }
        res.status(200).send('File uploaded successfully');
      });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  
  

  async getAll(req, res, next) {
    try {
      console.log("file controller get work")
      const comments = await Comments.findAll()
      return res.json(comments)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new FilesController();
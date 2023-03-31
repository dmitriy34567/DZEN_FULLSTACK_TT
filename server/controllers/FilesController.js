const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const ApiError = require('../error/ApiError');
const {Comments} = require('../models/models');
const path = require('path')

class FilesController {
  async create(req, res, next) {
    try {
      console.log(req.files)
        console.log(req.files.path)
        console.log(req.files.name)
        res.send(req.files);
      const form = new formidable.IncomingForm();
      form.uploadDir = path.join(process.cwd(), './uploads');
      form.keepExtensions = true;
      form.parse(req, (err, fields, files) => {
        if (err) throw err;
        const file = req.files; // Получаем первый файл из объекта files
        const fileName = file.name; // Получаем имя файла
        const filePath = file.path; // Получаем путь к файлу на сервере
        console.log('filePath:', filePath);
        console.log('fileName:', fileName);
        // Делаем что-то с файлом, например, сохраняем его на диск
        console.log('filePath:', filePath);
      fs.renameSync(filePath, form.uploadDir + fileName);
  
        res.send('File uploaded successfully');
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

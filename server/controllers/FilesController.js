const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const ApiError = require('../error/ApiError');
const {Comments} = require('../models/models');
const { v4: uuidv4 } = require('uuid');

const path = require('path')

class FilesController {
  async create(req, res, next) {
    try {
      const form = new formidable.IncomingForm();
      form.uploadDir = '../uploads'; // relative path to the uploads directory
      form.keepExtensions = true;
      form.parse(req, (err, fields, files) => {
        if (err) throw err;
        const file = req.files[0]; // Получаем файл из объекта files
        const fileName = uuidv4() // Получаем имя файла
        const filePath = file.path; // Получаем путь к файлу на сервере
        console.log(filePath)
        console.log(form.uploadDir + fileName+ ".jpg")
        // Делаем что-то с файлом, например, сохраняем его на диск
        fs.renameSync(filePath, form.uploadDir + "file"+ ".jpg");
        
        
        res.send('File uploaded successfully');
      });
        res.send('File uploaded successfully');
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

/* частично работает 
const form = new formidable.IncomingForm();
      form.uploadDir = '../uploads'; // relative path to the uploads directory
      form.keepExtensions = true;
      form.parse(req, (err, fields, files) => {
        if (err) throw err;
        const file = req.files[0]; // Получаем файл из объекта files
        const fileName = uuidv4() // Получаем имя файла
        const filePath = file.path; // Получаем путь к файлу на сервере
        console.log(filePath)
        console.log(form.uploadDir + fileName+ ".jpg")
        // Делаем что-то с файлом, например, сохраняем его на диск
        fs.renameSync(filePath, form.uploadDir + "file"+ ".jpg");
      
        res.send('File uploaded successfully');
      });
        res.send('File uploaded successfully');

*/

/* експерементальная штука пока не работает совсем но не крашится, возможно нужно еще как то до настроить
 const fs = require('fs');

// получаем картинку из запроса
const image = req.body.image;

// создаем новый файл с уникальным именем
const imageName = `${Date.now()}.png`;

// путь куда мы сохраняем картинку на сервере
const imagePath = `../uploads/${imageName}`;

// сохраняем картинку на сервере
fs.writeFile(imagePath, image, 'base64', (err) => {
  if (err) {
    console.error(err);
    return res.status(500).json({ error: 'Ошибка при сохранении изображения' });
  }

  // отправляем успешный ответ
  res.json({ success: true, imageUrl: `/images/${imageName}` });
});
     


*/
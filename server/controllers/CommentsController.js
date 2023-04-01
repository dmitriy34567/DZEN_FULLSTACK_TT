const uuid = require('uuid')
const path = require('path')
const express = require('express');
const {Comments} = require('../models/models')
const ApiError = require('../error/ApiError')

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


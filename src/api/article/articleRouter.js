const { Router } = require('express')
const { validate_token } = require('../../middleware/validate_token')
const articleController = require('./articleController')

const articleRouter = Router()

articleRouter.post('/insertArticle',
    articleController.onInsertArticle
)

module.exports = articleRouter
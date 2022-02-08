const { Router } = require('express')
const { validate_token } = require('../../middleware/validate_token')
const { validate_schema } = require('../../middleware/validate_schema')
const articleController = require('./articleController')
const { sch_onInsertArticle, sch_onEditArticle } = require('../article/articleSchema')
const multer = require('../../middleware/multer')
// const multer = require('multer')

const articleRouter = Router()

articleRouter.post('/insertArticle',
    multer('article').single('image_cover'),
    validate_token(),
    // validate_schema(sch_onInsertArticle),
    articleController.onInsertArticle
)

articleRouter.post('/editArticle',
    multer('article').single('image_cover'),
    validate_token(),
    validate_schema(sch_onEditArticle),
    articleController.onEditArticle
)

articleRouter.get('/getArticleTable',
    validate_token(),
    articleController.onGetArticleTable
)

articleRouter.get('/getSingleArticleTable',
    validate_token(),
    articleController.onGetSingleArticle
)

module.exports = articleRouter
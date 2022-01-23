const articleModel = require('./articleModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const { err, debug } = require('../../config/debug')
const { success, failed } = require('../../config/response')

class articleController {
    async onInsertArticle(req, res) {
        try {
            const { name, category, tag, is_show, content } = req.body
            const { article } = await articleModel.insertArticle({
                name,
                creator: 'user_mock',
                category,
                tag,
                image_cover_uri: 'image_mock',
                is_show,
                content
            })
            success(res, 'insert article successfully', article)
        } catch (error) {
            debug(error)
            failed(res, 'found issue')
        }
    }
}

module.exports = new articleController()
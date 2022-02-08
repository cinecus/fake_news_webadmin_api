const articleModel = require('./articleModel')
const path = require('path');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const { err, debug } = require('../../config/debug')
const { success, failed } = require('../../config/response')

class articleController {
    async onInsertArticle(req, res) {
        try {
            const user_id = req.user_id
            const { name, category, tag, is_show, content } = req.body
            const file = req.file
            let image_cover_uri
            if (!!file) {
                const result = await cloudinary.uploader.upload(
                    file.path, {
                    use_filename: true,
                    folder: 'file-upload'
                }).then((res) => image_cover_uri = res.url)
                await fs.unlinkSync(file.path)
            }
            const { article } = await articleModel.insertArticle({
                name,
                creator: user_id,
                category,
                tag,
                image_cover_uri,
                is_show,
                content
            })
            success(res, 'insert article successfully', article)
        } catch (error) {
            debug(error)
            failed(res, 'found issue')
        }
    }

    async onEditArticle(req, res) {
        try {
            const user_id = req.user_id
            const { name, category, tag, is_show, content, article_id } = req.body
            const file = req.file
            let image_cover_uri
            if (!!file) {
                const result = await cloudinary.uploader.upload(
                    file.path, {
                    use_filename: true,
                    folder: 'file-upload'
                }).then((res) => image_cover_uri = res.url)
                await fs.unlinkSync(file.path)
            }
            const { article } = await articleModel.editArticle({
                article_id,
                name,
                creator: user_id,
                category,
                tag,
                image_cover_uri,
                is_show,
                content
            })
            success(res, 'insert article successfully', article)
        } catch (error) {
            debug(error)
            failed(res, 'found issue')
        }
    }

    async onGetArticleTable(req, res) {
        try {
            let { article } = await articleModel.getAllArticle()
            // article = article.map(el => {
            //     const { image_cover_uri, content, ...temp_article } = el
            //     return temp_article
            // })
            success(res, 'get Article successfully', article)
        } catch (error) {
            debug(error)
            failed(res, 'found issue')
        }
    }

    async onGetSingleArticle(req, res) {
        try {
            const { article } = await articleModel.findArticle(req.query.article_id)
            success(res, 'get Single Article successfully', article)
        } catch (error) {
            debug(error)
            failed(res, 'found issue')
        }
    }
}

module.exports = new articleController()
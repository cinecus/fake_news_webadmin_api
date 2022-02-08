const { ArticleSchema } = require('./articleSchema')
const mongoose = require('mongoose')
const moment = require('moment')
const ObjectId = mongoose.Types.ObjectId

class articleModel {
    async insertArticle(obj) {
        try {
            const article = await ArticleSchema.create({ ...obj })
            return { completed: true, article }
        } catch (error) {
            console.log('error', error)
            return { completed: false }
        }
    }
    async editArticle(obj) {
        try {
            const { article_id, ...temp_obj } = obj
            const article = await ArticleSchema.findByIdAndUpdate(article_id, {
                $set: {
                    ...temp_obj
                }
            }, { upsert: true, new: true })
            return { completed: true, article }
        } catch (error) {
            console.log('error', error)
            return { completed: false }
        }
    }
    async getAllArticle() {
        try {
            const article = await ArticleSchema.find({}).lean()
            return { completed: true, article }
        } catch (error) {
            console.log('error', error)
            return { completed: false }
        }
    }
    async findArticle(id) {
        try {
            const article = await ArticleSchema.findById(id)
            return { completed: true, article }
        } catch (error) {
            console.log('error', error)
            return { completed: false }
        }
    }
}

module.exports = new articleModel()
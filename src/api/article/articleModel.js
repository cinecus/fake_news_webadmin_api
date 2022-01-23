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
            return { completed: false }
        }
    }
}

module.exports = new articleModel()
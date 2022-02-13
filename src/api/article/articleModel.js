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
            const pipeline = [
                {
                    '$lookup': {
                        'from': 'user',
                        'localField': 'creator',
                        'foreignField': '_id',
                        'as': 'user'
                    }
                }, {
                    '$unwind': {
                        'path': '$user'
                    }
                }, {
                    '$project': {
                        '_id': 1,
                        'name': 1,
                        'creator': {
                            '$concat': ['$user.first_name', ' ', '$user.last_name']
                        },
                        'category': 1,
                        'tag': 1,
                        'image_cover_uri': 1,
                        'content': 1,
                        'is_show': 1,
                        'created_date': 1,
                        'updated_date': 1
                    }
                }, {
                    '$sort': {
                        'created_date': -1
                    }
                }
            ]
            const article = await ArticleSchema.aggregate(pipeline)
            return { completed: true, article }
        } catch (error) {
            console.log('error', error)
            return { completed: false }
        }
    }
    async findArticle(id) {
        try {
            const article = await ArticleSchema.findById(id).lean()
            return { completed: true, article }
        } catch (error) {
            console.log('error', error)
            return { completed: false }
        }
    }
}

module.exports = new articleModel()
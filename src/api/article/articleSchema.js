// const Joi = require('Joi')
const mongoose = require('mongoose')
const moment = require('moment')

const articleSchema = mongoose.Schema({
    name: String,
    creator: mongoose.Types.ObjectId,
    category: String,
    tag: [String],
    image_cover_uri: String,
    is_show: Boolean,
    content: String,
    created_date: { type: Date, default: moment() },
    updated_date: { type: Date, default: moment() }
}, { collection: 'article' })

exports.ArticleSchema = mongoose.model('article', articleSchema)

// exports.sch_onInsertArticle = Joi.object().keys({
//     name: Joi.string().required(),
//     category: Joi.string().required(),
//     tag: Joi.array().required(),
//     is_show: Joi.boolean().required(),
//     content: Joi.string().required()
// })

// exports.sch_onEditArticle = Joi.object().keys({
//     article_id: Joi.string().required(),
//     name: Joi.string(),
//     category: Joi.string(),
//     tag: Joi.array(),
//     is_show: Joi.boolean(),
//     content: Joi.string(),
// })


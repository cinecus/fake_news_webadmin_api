const Joi = require('Joi')
const mongoose = require('mongoose')
const moment = require('moment')

const articleSchema = mongoose.Schema({
    name: String,
    creator: String,
    category: String,
    tag: [String],
    image_cover_uri: String,
    is_show: Boolean,
    content: String,
    created_date: { type: Date, default: moment() },
    updated_date: { type: Date, default: moment() }
}, { collection: 'article' })

exports.ArticleSchema = mongoose.model('article', articleSchema)
const Joi = require('Joi')
const mongoose = require('mongoose')
const moment = require('moment')

const tagSchema = mongoose.Schema({
    tag_name: String,
    color: String
}, { collection: 'tag' })

exports.TagSchema = mongoose.model('tag', tagSchema)
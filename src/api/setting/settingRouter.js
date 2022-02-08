const { Router } = require('express')
const { validate_token } = require('../../middleware/validate_token')
const { validate_schema } = require('../../middleware/validate_schema')

const settingController = require('./settingController')

const settingRouter = Router()

settingRouter.get('/getAllTag',
    settingController.onGetAllTag
)

module.exports = settingRouter
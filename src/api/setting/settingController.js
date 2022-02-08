const settingModel = require('./settingModel')

const { err, debug } = require('../../config/debug')
const { success, failed } = require('../../config/response')

class settingController {
    async onGetAllTag(req, res) {
        try {
            const { tag } = await settingModel.getTag()
            success(res, 'success', tag)
        } catch (error) {
            debug(error)
            failed(res, 'found issue')
        }
    }
}

module.exports = new settingController()
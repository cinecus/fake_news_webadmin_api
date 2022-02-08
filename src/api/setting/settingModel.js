const { TagSchema } = require('./settingSchema')
const mongoose = require('mongoose')

class settingModel {
    async getTag() {
        try {
            const tag = await TagSchema.find().lean()
            return { completed: true, tag }
        } catch (error) {
            console.log(error);
            return { completed: false }
        }
    }
}

module.exports = new settingModel()
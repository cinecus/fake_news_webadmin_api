const jsonwebtoken = require('jsonwebtoken')
const { failed } = require('../config/response')
const { err, debug } = require('../config/debug')
const { getOriginPath } = require('../functions')
const { ignoreCheckToken } = require('../utils')


exports.validate_token = () => {
    return (req, res, next) => {
        if (!req.originalUrl) {
            return failed(res, NULL, 404)
        }
        const origin = getOriginPath(req.originalUrl)
        const checkIgnore = ignoreCheckToken.indexOf(origin) >= 0
        if (checkIgnore || req.headers.authorization === process.env.BYPASS_KEY) {
            debug(`By Pass token`)
            return next()
        }
        if (req.headers && req.headers.authorization) {
            debug(`access token: ${req.headers.authorization}`)
            jsonwebtoken.verify(req.headers.authorization, process.env.SIGN, (error, decode) => {
                if (error) {
                    err('token not found', req.originalUrl)
                    failed(res, 'token not found')
                } else {
                    debug('access user_id', decode.user_id)
                    req.token = req.headers.authorization
                    req.user_id = decode.user_id
                    req.role = decode.role
                    req.device_id = decode.device_id
                    next()
                }
            })
        } else {
            failed(res, 'token not found')
        }
    }
}

exports.validate_role = (require_role = 'observer') => {
    return (req, res, next) => {
        if (req.role === 'admin') {
            debug('request role is admin')
            next()
        }
        else if (req.role === require_role) {
            debug(`request role is ${req.role}`)
            next()
        } else {
            failed(res, 'not permission for this role')
        }
    }
}
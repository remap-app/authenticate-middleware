const { STATUS_CODES } = require('http')
const { createError } = require('micro-errors')
const { Authentication } = require('@remap/services')

const STATUS_MESSAGE_400 = STATUS_CODES[400]
const STATUS_MESSAGE_401 = STATUS_CODES[401]

const parseAuthToken = auth => auth.trim().split('Bearer ')[1]

module.exports = ({ authenticate = Authentication.authenticate } = {}) => {
  if (typeof authenticate !== 'function') {
    throw new TypeError('`authenticate` service client must be function')
  }

  return fn => async (req, res, ...rest) => {
    const { authorization } = req.headers
    if (!authorization) {
      res.setHeader('WWW-Authenticate', 'Bearer realm=""')
      throw createError(401, STATUS_MESSAGE_401)
    }

    const idToken = parseAuthToken(authorization)
    if (!idToken) {
      res.setHeader('WWW-Authenticate', 'Bearer error="invalid_request"')
      throw createError(400, STATUS_MESSAGE_400, null, { detail: 'Invalid token format' })
    }

    const auth = await authenticate(idToken).catch(error => { throw error })

    if (!auth) {
      res.setHeader('WWW-Authenticate', 'Bearer error="invalid_token"')
      throw createError(401, STATUS_MESSAGE_401, null, { detail: 'Invalid token' })
    }

    req.auth = auth

    return fn(req, res, ...rest)
  }
}

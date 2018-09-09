import test from 'ava'
import micro from 'micro'
import compose from 'micro-compose'
import { handleErrors } from 'micro-errors'
import listen from 'test-listen'
import fetch from 'node-fetch'
import middleware from '.'

const createAuthenticationMock = returnValue => idToken => new Promise((resolve, reject) => {
  if (returnValue instanceof Error) {
    reject(returnValue)
  } else {
    resolve(returnValue)
  }
})

test('returns auth with valid idToken', async t => {
  const enhanced = compose(
    handleErrors(),
    middleware({
      authenticate: createAuthenticationMock({
        uid: 'sf98s7df',
        name: 'Shingo Sato',
        picture: 'https://graph.facebook.com/1736908143023349/picture',
        auth_time: 1533455916,
        email: 'shinsugar@gmail.com',
        email_verified: true,
      })
    })
  )(async req => {
    return req.auth
  })

  const idToken = 'as098as0d9f09as8f09ds8f09dsa8f09ads8f09syadv'

  const service = micro(enhanced)

  const url = await listen(service)
  const res = await fetch(url, { headers: { Authorization: `Bearer ${idToken}` } })
  const body = await res.json()

  t.deepEqual(body, {
    uid: 'sf98s7df',
    name: 'Shingo Sato',
    picture: 'https://graph.facebook.com/1736908143023349/picture',
    auth_time: 1533455916,
    email: 'shinsugar@gmail.com',
    email_verified: true,
  })

  service.close()
})

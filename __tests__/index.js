import { Authenticator } from 'passport'
import authentication from '../lib/index.js'

test('returns passport Authenticator instance', () => {
  const auth = authentication()
  expect(auth).not.toBeNull()
  expect(auth).toBeInstanceOf(Authenticator)
})

test('includes only enabled strategies', () => {
  const auth = authentication({
    strategies: {
      auth0: {
        verify () {},
        options: {
          domain: 'abc.com',
          clientID: 'leCLientId',
          clientSecret: 'leClientSecret',
          callbackURL: 'leCallbackUrl',
        },
      },
    },
  })

  expect(auth._strategies).toHaveProperty('auth0')
})

test('throws on omitted verify callback', () => {
  function createAuth () {
    return authentication({
      strategies: {
        auth0: {
          options: {
            domain: 'abc.com',
            clientID: 'leCLientId',
            clientSecret: 'leClientSecret',
            callbackURL: 'leCallbackUrl',
          },
        },
      },
    })
  }

  expect(createAuth).toThrowError(/OAuth2Strategy requires a verify callback/)
})

test('throws on invalid strategy', () => {
  function createAuth () {
    return authentication({
      strategies: {
        local: {},
      },
    })
  }

  expect(createAuth).toThrowError(/Cannot find module/)
})

test('includes options in strategy and propegate', () => {
  const actualOptions = {
    domain: 'abc.com',
    clientID: 'leCLientId',
    clientSecret: 'leClientSecret',
    callbackURL: 'leCallbackUrl',
  }

  const expectedOptions = Object.assign({}, actualOptions, {
    authorizationURL: 'https://abc.com/authorize',
    tokenURL: 'https://abc.com/oauth/token',
    userInfoURL: 'https://abc.com/userinfo',
    apiUrl: 'https://abc.com/api',
  })

  const auth = authentication({
    strategies: {
      auth0: {
        verify () {},
        enabled: true,
        options: actualOptions,
      },
    },
  })

  expect(auth._strategies.auth0).toHaveProperty('options')
  expect(auth._strategies.auth0.options).toMatchObject(expectedOptions)
})

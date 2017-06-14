// const express = require('express')
// const session = require('express-session')
const authentication = require('../lib')
// const RedisStore = require('connect-redis')(session)
// const sessionStore = new RedisStore({ host: 'localhost' })

// const app = express()

// app.use(auth({
//   secure: true,
//   auth0: {
//     domain: 'example.local',
//     clientID: 'foo.com'
//   }
// }))

const auth = authentication({
  strategies: {
    auth0: {
      enabled: true,
      verify (accessToken, refreshToken, extraParams, profile, done) {
        done(null, profile)
      },
      options: {
        domain: 'abc.com',
        clientID: 'leCLientId',
        clientSecret: 'leClientSecret',
        callbackURL: 'leCallbackUrl',
      },
    },
  },
})

console.log(auth)

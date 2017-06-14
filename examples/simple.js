const express = require('express')
const authentication = require('../lib')

const app = express()

const auth = authentication({
  strategies: {
    auth0: {
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

// Required in order for Passport to serialize user to a session.
auth.serializeUser((user, done) => {
  done(null, user)
})

auth.deserializeUser((user, done) => {
  done(null, user)
})

app.use(auth.initialize())
app.use(auth.session())

function ensureLoggedIn (req, res, next) {
  if (req.isAuthenticated && !req.isAuthenticated()) {
    res.redirect('/')
  }
}

app.get('/auth0/callback', auth.authenticate('auth0', { failureRedirect: '/' }), (req, res) => {
  res.redirect(req.session.redirectTo || '/welcome')
})

app.get('/welcome', ensureLoggedIn, (req, res) => {
  res.statusCode(200).send(`Welcome, ${req.user.displayName}!`)
})

app.listen(1337, () => {
  console.log('Listening at localhost:1337')
})

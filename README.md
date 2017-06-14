# Duuoo Auth

Authentication module for Duuoo. Uses [Passport](http://passportjs.org).

## Usage

```js
import express from 'express'
import authenticate from 'duuoo-auth'

const app = express()

// Setup the middleware
const auth = authenticate({
  strategies: {
    auth0: {
      verify (accessToken, refreshToken, extraParams, profile, done) {
        done(null, profile)
      },
      options: {
        domain: 'example.eu.auth0.com',
        clientID: 'CLIENT ID',
        clientSecret: 'CLIENT SECRET',
        callbackURL: 'https://example.com/callback',
      },
    },
  },
})

// Initialize Passport
app.use(auth.initialize())

app.get('/callback', auth.authenticate('auth0', { failureRedirect: '/' }, (req, res) => {
    res.redirect(req.session.returnTo || '/profile')
})
```

## API

### `authenticate(options) => Passport.Authenticator`

Returns Passport middleware.

#### Options

- `strategies` - An object describing strategies and their configuration.
  - `options: object` – Options passed to this strategy
  - `verify: Function` – The verify callback which is called by the strategy upon verification.

## Strategies

### `auth0`

Authenticates users using Auth0's services.

#### Options

- `domain: String` – The domain to your Auth0 client.
- `clientID: String` – The client id for your Auth0 client.
- `clientSecret: String` – The client secret for your Auth0 client.
- `callbackURL: String` – The callback URL that Auth0 redirects to for verification.

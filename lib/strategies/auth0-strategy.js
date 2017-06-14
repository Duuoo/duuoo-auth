const Auth0Strategy = require('passport-auth0')

module.exports = function auth0Strategy (options, middleware) {
  return new Auth0Strategy(options, middleware)
}

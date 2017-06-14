const path = require('path')
const passport = require('passport')
const _ = require('lodash/fp')

const mapFilenames = _.map(([name, config]) => {
  const filename = path.join(__dirname, 'strategies', `${name}-strategy.js`)
  return [name, config, { filename }]
})
const transformToStrategies = _.compose(mapFilenames, _.toPairs)

function registerStrategyToPassport (passport) {
  return ([name, config, meta]) => {
    const strategyModule = require(meta.filename)
    passport.use(strategyModule(config.options, config.verify))
  }
}

function registerStrategiesToPassport (strategies, passport) {
  _.forEach(registerStrategyToPassport(passport))(strategies)
}

module.exports = function auth (options = {}) {
  const strategies = transformToStrategies(options.strategies)
  registerStrategiesToPassport(strategies, passport)

  return passport
}

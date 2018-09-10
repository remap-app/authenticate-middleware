# authenticate-middleware

[![CircleCI](https://circleci.com/gh/remap-app/authenticate-middleware.svg?style=svg&circle-token=e081049555083cdc0703ef912dd7c933c5b74ab6)](https://circleci.com/gh/remap-app/authenticate-middleware)

```sh
yarn add @remap/authenticate-middleware
```

## Usage

```js
const compose = require('micro-compose')
const { handleErrors } = require('micro-errors')
const auhtenticate = require('@remap/authenticate-middleware')
const authenticationService = require('./services/authentication')

module.exports = compose(
  handleErrors(),
  authenticate({ authentication: authenticationServive })
)(
  async (req, res) => {
    // req.auth
  }
)
```

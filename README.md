# authenticate-middleware

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

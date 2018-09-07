# authenticate-middleware

```sh
yarn add @remap/authenticate-middleware
```

## Usage

```js
const compose = require('micro-compose')
const auhtenticate = require('authenticate-middleware')
const authenticationService = require('./services/authentication')

module.exports = compose(
  authenticate({ authentication: authenticationServive })
)(
  async (req, res) => {
    // req.userId
  }
)
```

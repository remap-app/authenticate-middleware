# authenticate-middleware

[![CircleCI](https://circleci.com/gh/remap-app/authenticate-middleware.svg?style=svg&circle-token=e081049555083cdc0703ef912dd7c933c5b74ab6)](https://circleci.com/gh/remap-app/authenticate-middleware)

```sh
yarn add @remap/authenticate-middleware
```

## Usage

```js
const compose = require('micro-compose')
const { handleErrors } = require('micro-errors')
const authenticateMiddleware = require('@remap/authenticate-middleware')

module.exports = compose(
  handleErrors(),
  authenticateMiddleware(),
)(
  async (req, res) => {
    // req.auth
    // {
    //   name: string;
    //   picture: string;
    //   auth_time: number;
    //   email: string;
    //   email_verified: boolean;
    //   uid: string;
    // }
  }
)
```

### Optional custom authenticator

```js
const middleware = authenticateMiddleware({
  authenticate: async () => await doSomething(),
})
```

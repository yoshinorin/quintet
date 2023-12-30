# Quintet

[![CI](https://github.com/yoshinorin/quintet/actions/workflows/ci.yml/badge.svg)](https://github.com/yoshinorin/quintet/actions/workflows/ci.yml) | [E2E Test Report](https://yoshinorin.github.io/quintet/)

The front end for [Qualtet](https://github.com/yoshinorin/qualtet).

> [Live](https://yoshinorin.net)

## Run locally

1. create `config.local.js`
2. `npm run server`

## Run qualtet mock server

```sh
$ docker compose -f docker-compose.mock.yml up
```

## Test

Unit test

```
$ npm run test
```

E2E test (require docker)

```
$ npm run test:e2e
```

# LICENSE

© yoshinorin

> [NO LICENSE (NO PERMISSION)](https://choosealicense.com/no-permission/)

> [GitHub Licensing a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository)

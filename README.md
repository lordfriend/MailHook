# MailHook

This is a web hook example for Albireo. Use Nodejs, Typescript, Express and Lokijs to set a web hook and notify subscribers via email
when an episode download event is received.

## Usage

1. clone this repo.
2. install dependencies via yarn

```
cd MailHook
yarn install
```

3.update your config files. copy and rename sender.example.yml to sender.yml, copy and rename config.example.yml to config.yml

4.run npm build to compile Typescript files.

5.run your app from dist/app.js

Default port is 9800, you can set environment variable PORT with another port number.

Default shared secret in config.yml is hikari but it is strongly recommended use your own shared secret.

## Sentry:

modify your config.yml, fill `sentry_dsn` with your client DSN key.
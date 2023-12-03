# daily-reporter

## How to use

- Create `.env` file in the root directory

```shq
cp .env.example .env
```

- Edit `.env` file

- Run script

```sh
deno run -A --unstable server.ts
```

## Show debug logs

Set `DEBUG_LEVEL` to `debug` in `.env` file

## Deploy to Deno Deploy

- Sign up for Deno Deploy and create a blank project

  - Select `Deploy your own code`

- Add environment variables from `Settings` tab

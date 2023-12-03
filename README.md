# daily-reporter

## How to use

- Create `.env` file in the root directory

```shq
cp .env.example .env
```

- Edit `.env` file

- Run script

```sh
deno run -A main.ts
```

## Show debug logs

Set `DEBUG_LEVEL` to `debug` in `.env` file

## Deploy to Deno Deploy

- install the deployctl utility

```sh
deno install -A --no-check -r -f https://deno.land/x/deploy/deployctl.ts
```

- Sign up for Deno Deploy and create a blank project
  - Select `Deploy your own code`

# Trailshark

Crowdsourced mountain bike trail conditions.

## Running locally

Three things need running:

1. `docker compose up` from root dir
2. `cd backsy && air` to run backend
3. `cd fronty && pnpm dev` to run frontend

Then you can open `http://localhost:3320` and have at.

## Codegen

Currently just run `task:gen` from `backsy`.

## Ports

| Port | Purpose                                            |
| ---- | -------------------------------------------------- |
| 3320 | Main site, visit in a browser to browse TRAILSHARK |
| 3321 | Sveltekit site (frontend)                          |
| 3322 | Echo/GraphQL access                                |
| 3323 | Postgres DB                                        |
| 3324 | Adminer DB UI                                      |
| 3325 | Redis                                              |

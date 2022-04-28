# Welcome to the Anythink Market repo

To start the app use Docker. It will start both frontend and backend, including all the relevant dependencies, and the db.

Please find more info about each part in the relevant Readme file ([frontend](frontend/readme.md) and [backend](backend/README.md)).

## Setup

- install [docker](https://docs.docker.com/get-docker/) 
  - to verify installation, try `docker -v` and `docker-compose -v`.
- run the environment with `docker-compose up`
  - to verify, go to http://localhost:3000/api/ping
- create a local user on http://localhost:3001/register


## Development

When implementing a new feature or fixing a bug, please create a new pull request against `main` from a feature/bug branch and add `@vanessa-cooper` as reviewer.

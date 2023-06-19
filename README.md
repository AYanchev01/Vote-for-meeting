<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://i.imgur.com/a0g6yG0.png">
  <img src="https://i.imgur.com/a0g6yG0.png" alt="Logo" width="" height="300">
</picture>
<div id="top"></div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#introduction">Introduction</a>
      <ul>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#quickstart">Getting Started</a>
    </li>
    <li><a href="#running-locally">Running Locally</a></li>
  </ol>
</details>

<br>
<!-- Introduction -->

# Introduction

Vote for Meeting is a Doodle-clone web app that lets users schedule meetings by creating events, setting options for the available dates and times and sharing with other users who can vote in order to decide on the most wanted option. The application is built with React, TypeScript, Node.js, Express, PostgreSQL, Prisma ORM, Docker and Git.
# Requirements

This project requires the following software:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)


# Built With

The app has been built with the following technologies:

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma ORM](https://prisma.io/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

<div align="right"><p align="right">(<a href="#top">back to top</a>)</p></div>
<!-- GETTING STARTED -->

# Quickstart

1. Clone the repo

```sh
git clone https://github.com/AYanchev01/Vote-for-meeting.git
```

2. Configure the environment variables in the docker-compose.yml file or you can leave the default ones.

```yml
DATABASE_URL:
ACCESS_TOKEN_SECRET:

POSTGRES_PASSWORD:
POSTGRES_USER:
POSTGRES_DB:
```

3. Compose the project

```sh
docker-compose up --build -d
```

## Running locally
- Install [Node.js](https://nodejs.org/en/download)
- Install [PostgreSQL](https://www.postgresql.org/download/)
- Clone the repo - ```git clone https://github.com/AYanchev01/Vote-for-meeting.git```
- Copy .env.template to .env and fill in the variables.
- Run ```npm install``` in server/ and client/
- Run ```npx prisma migrate dev``` and ```npx prisma generate``` in server/
- Run ```npm start``` in server/
- Run ```npm start``` in client/
<div align="right"><p align="right">(<a href="#top">back to top</a>)</p></div>

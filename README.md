<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://github.com/HalfLife7/vgm-list/blob/master/vgm-list-logo.png?raw=true" alt="Project logo"></a>
</p>

<h3 align="center"><a href="https://vgm-list.netlify.app/">VGM List</a></h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Last Committ](https://img.shields.io/github/last-commit/HalfLife7/vgm-list)](https://github.com/HalfLife7/vgm-list/commits/master)
[![License](https://img.shields.io/github/license/HalfLife7/vgm-list)](/LICENSE)

</div>

---

<p align="center"> Find the boss theme song from your favourite game!</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Built Using](#built_using)
- [TODO](./TODO.md)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

<p>VGM List is a resource for video games and their original sound tracks.</p>

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them.

---

## Requirements

For development, you will need Node.js (14+), a node package manager installed in your environment and PostgreSQL.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

If the installation was successful, you should be able to run the following command.

```
    $ node --version
    v14.8

    $ npm --version
    6.14.5
```

## Install

```
    $ git clone https://github.com/HalfLife7/vgm-list
    $ cd vgm-list
    $ cd client
    $ npm install
    $ cd ../server
    $ npm install
    $ knex migrate:latest
    $ knex seed:run
```

## Configure app

Open `vgm-list/server/.env.example` and `vgm-list/client/.env.example`then edit it with your settings and rename to ONLY '.env'. You will need:

```
- DATABASE_URL = postgres://DATABASE_USER_NAME:DATABASE_USER_PASSWORD@localhost:5432/DATABASE_NAME (replace with your Postgres connection string)
```

## Running the project in development

You will need 2 terminals to run the project (one for the backend and one for the front-end)

```
    $ cd server
    $ npm run watch:dev
```

```
    $ cd client
    $ npm run serve
```

## ⛏️ Built Using <a name = "built_using"></a>

### Backend

- [NodeJS](https://nodejs.org/en/) - Server Environment
- [Express](https://expressjs.com/) - Server Framework
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Knex](http://knexjs.org/) - SQL Query Builder
- [Objection](https://vincit.github.io/objection.js/) - ORM Built on Knex

### Frontend

- [Vue](https://vuejs.org/) - Frontend Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [vue-awesone-swiper](https://github.surmon.me/vue-awesome-swiper/) - Vue Media Carousel based on [Swiper](https://swiperjs.com/)
- [vue-good-table](https://xaksis.github.io/vue-good-table/) - Data Tables
- [vue-plyr](https://github.com/sampotts/plyr) - Vue Media Player Based on [Plyr](https://plyr.io/")

### Utilities

- [axios](https://www.npmjs.com/package/axios) - HTTP Client
- [cron](https://www.npmjs.com/package/cron) - Scheduler
- [Moment](https://momentjs.com/) - Datetime Library
- [IGDB](https://www.igdb.com/) - Game API to populate db
- [VGMdb API](http://vgmdb.info/) - VGM API to populate db (pulls data from VGMdb.net)

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Big thanks to anyone whose code or tutorials were used (acknowledged in code comments)
- IGDB and [VGMdb](https://vgmdb.net/) for having up to date information
- VGMdb.info for creating an API for VGMdb.net

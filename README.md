# generator-js-mssql

> A [Yeoman generator](http://yeoman.io/) for scaffolding ES2015 and MSSQL web applications.

## Getting started

Start with cloning the repository:

```bash
git clone https://github.com/Kugghuset/generator-js-mssql.git
```

Then `cd` into the folder and install dependencies.

```bash
# cd into the folder
cd generator-js-mssql

# install dependencies
npm install
```

When the installation is finished, link the repo for access via `yo js-mssql` from the command line.

```bash
npm link
```

## Generators

### js-mssql

```bash
yo js-mssql [name]
```

Scaffolds ouit the base application.

### js-mssql:route

```bash
yo js-mssql:route [name]
```

Adds an API endpoint to the server.

### js-mssql:service

```bash
yo js-mssql:service [name]
```

Adds a service to the server.

### js-mssql:component

```bash
yo js-mssql:component [name]
```

Adds a Vue component to the frontend application.

### js-mssql:tsd

```bash
yo js-mssql:tsd
```

Installs d.ts files for all dependencies and dev-dependencies in the `package.json` file.

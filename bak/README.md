# 五月祭・駒場祭企画「ハッカーになろう」

Forked from [kf74-website](https://github.com/ut-code/kf74-website)

Contains some copy from [practice-sql](https://github.com/brdgb/practice-sql)

# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Setup

```sh
make setup
```

### Local Development

```sh
make start
```

This command starts a local development server on port 4000 and opens up a localhost:4000.

### Build

```sh
make build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```sh
# setup command:
make prepare-deploy
```

```sh
# start command:
make deploy
```

--- 
Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.



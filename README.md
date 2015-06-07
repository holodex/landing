# Holodex landing

landing page for the [Holodex app](https://github.com/open-app/holodex)

## how to

### install

```
cd ~/repos/holodex
git clone https://github.com/holodex/landing
cd landing
npm install
```

### start

will build once and start a static server

```
npm start
```

### develop

will build on watch and start a livereload server

```
npm run develop
```

### stage

will build once and deploy to gh-pages

```
npm run stage
```

### deploy (TODO)

add `deploy` remote repo

```
git remote add deploy dokku@holodex.is:landing
```

will build once and deploy to dokku

```
npm run deploy
```

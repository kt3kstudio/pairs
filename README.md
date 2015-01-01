# long-dream-core v0.1.10

[![Build Status](https://travis-ci.org/kt3kstudio/long-dream-core.svg?branch=gh-pages)](https://travis-ci.org/kt3kstudio/long-dream-core)

[![Coverage Status](https://coveralls.io/repos/kt3kstudio/long-dream-core/badge.png?branch=gh-pages)](https://coveralls.io/r/kt3kstudio/long-dream-core?branch=gh-pages)

> A puzzle game on straw platform

# Use in ios or android projects

```sh
app/ $ bower install --save [this repo]

app/ $ cd bower_components/long-dream-core
app/bower_components/long-dream-core $ bundle install
app/bower_components/long-dream-core $ BASE_DIR=../../ BUILD_DIR=src/main/assets bundle exec middleman build
```

The above creates the middleman build result at `app/src/main/assets` using js files under `app/infrastructure`.

The name of `infrastructure` came from the terminology of DDD.

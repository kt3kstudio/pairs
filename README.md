# long-dream-core v0.2.0 [![Build Status](https://travis-ci.org/kt3kstudio/long-dream-core.svg?branch=gh-pages)](https://travis-ci.org/kt3kstudio/long-dream-core) [![Coverage Status](https://coveralls.io/repos/github/kt3kstudio/long-dream-core/badge.svg?branch=gh-pages)](https://coveralls.io/github/kt3kstudio/long-dream-core?branch=gh-pages) [![js-soufflé-style](https://img.shields.io/badge/code%20style-soufflé-brightgreen.svg)](https://github.com/kt3k/souffle)


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


# [API doc](http://kt3kstudio.github.io/long-dream-core/doc/v0.2.0/)

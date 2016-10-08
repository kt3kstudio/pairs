# long-dream-core v0.5.0

[![Circle CI](https://circleci.com/gh/kt3kstudio/long-dream-core.svg?style=svg)](https://circleci.com/gh/kt3kstudio/long-dream-core)
[![codecov](https://codecov.io/gh/kt3kstudio/long-dream-core/branch/master/graph/badge.svg)](https://codecov.io/gh/kt3kstudio/long-dream-core)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> A puzzle game on straw platform

# node.js version

- use .node-version enabled node version manager (nodenv, n (+avn), nvm (+avn), nodebrew (+avn))

# Build & Run

    npm install
    npm start

# Use in ios or android projects

```sh
app/ $ bower install --save [this repo]

app/ $ cd bower_components/long-dream-core
app/bower_components/long-dream-core $ bundle install
app/bower_components/long-dream-core $ BASE_DIR=../../ BUILD_DIR=src/main/assets bundle exec middleman build
```

The above creates the middleman build result at `app/src/main/assets` using js files under `app/infrastructure`.

The name of `infrastructure` came from the terminology of DDD.

# [API doc](http://kt3kstudio.github.io/long-dream-core/doc/v0.5.0/)

# The subprojects

This project has produced a lot of subprojects. Here list of them:

- [class-component](https://github.com/kt3k/class-component)
  - MVP architecture tool.
- [bulbo](https://github.com/kt3k/bulbo)
  - A static site generator created for this project.
  - [minirocket](https://github.com/kt3k/minirocket)
    - A cli utility created for bulbo.
- [layout-wrapper](https://github.com/kt3k/layout-wrapper)
  - A gulp transform created for this project.
- [bundle-through](https://github.com/kt3k/bundle-through)
  - A gulp transform created for this project.
- [spn](https://github.com/kt3k/spn)
  - The positioning engine created for and used in this project.
- [dom-gen](https://github.com/kt3k/dom-gen)
  - dom generating shorthand library create for class-component.
- [scenarioscript](https://github.com/kt3k/scenarioscript)
  - The scenario description DSL created for storing the scenario in this project.
- [get-property-names](https://github.com/kt3k/get-property-names)
  - The property iteration utility
- Other ui plugins: [puncher](https://github.com/kt3k/puncher) [multiflip](https://github.com/kt3k/multiflip) [multiflip-bubble](https://github.com/kt3k/multiflip-bubble) [swipe-event](https://github.com/kt3k/swipe-event) [arrowkeys](https://github.com/kt3k/arrowkeys)

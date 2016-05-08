const bulbo = require('bulbo')
const asset = bulbo.asset

const bundler = require('bundle-through')
const wrapper = require('layout-wrapper')
const frontMatter = require('gulp-front-matter')

const config = {lang: 'en'}
const configJSON = JSON.stringify(config)
const SITE = 'site'
const SRC = 'src'

// js
asset(`${ SITE }/**/*.js`)
  .assetOptions({read: false})
  .watch(`${ SITE }/**/*.js`, `${ SRC }/**/*.js`)
  .pipe(bundler({transform: 'babelify'}))

// infrastructure.js
asset(`${ SRC }/infrastructure/infrastructure.js`)
  .watch(`${ SRC }/infrastructure/*.js`)
  .base(`${ SRC }/infrastructure`)
  .pipe(bundler({transform: 'babelify'}))

// html
asset(`${ SITE }/*.html`)
  .watch(`${ SITE }/*.html`, `${ SITE }/layout/*.nunjucks`)
  .pipe(frontMatter())
  .pipe(wrapper.nunjucks({layout: `${ SITE }/layouts`, data: {configJSON}}))

// others
asset(`${ SITE }/data/**/*.*`).base(SITE)
asset(`${ SITE }/img/**/*.*`).base(SITE)
asset(`${ SITE }/css/**/*.*`).base(SITE)

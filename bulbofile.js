const bulbo = require('bulbo')
const asset = bulbo.asset

const bundler = require('bundle-through')
const wrapper = require('layout-wrapper')
const frontMatter = require('gulp-front-matter')

const config = {lang: 'en'}
const presets = require('./src/debug/ls-switch/presets')
const basepath = process.env.BASEPATH || ''
const SITE = 'site'
const SRC = 'src'

const IS_DEV = process.env.NODE_ENV !== 'production'

const templateData = {config, basepath, IS_DEV, presets}

// js
asset(`${SITE}/**/*.js`)
  .assetOptions({read: false})
  .watch(`${SITE}/**/*.js`, `${SRC}/**/*.js`)
  .pipe(bundler({transform: 'babelify'}))

// infrastructure.js
asset(`${SRC}/infrastructure/infrastructure.js`)
  .watch(`${SRC}/infrastructure/*.js`)
  .base(`${SRC}/infrastructure`)
  .pipe(bundler({transform: 'babelify'}))

// html
asset(`${SITE}/*.html`, `${SITE}/bed/*.html`)
  .base(SITE)
  .watch(`${SITE}/*.html`, `${SITE}/bed/*.html`, `${SITE}/layout/*.nunjucks`)
  .pipe(frontMatter())
  .pipe(wrapper.nunjucks({
    basepath,
    layout: `${SITE}/layouts`,
    data: templateData
  }))

// data
asset(`${SITE}/data/**/*.*`).base(SITE)

// images
asset(`${SITE}/**/*.{svg,png}`).base(SITE)

// css
asset(`${SITE}/**/*.css`).base(SITE)

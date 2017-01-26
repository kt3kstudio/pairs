const bulbo = require('bulbo')
const asset = bulbo.asset

const bundler = require('bundle-through')
const frontMatter = require('gulp-front-matter')
const layout1 = require('layout1')
const sass = require('gulp-sass')

const config = {lang: 'en'}
const presets = require('./src/debug/ls-switch/presets')
const basepath = process.env.BASEPATH || ''
const SITE = 'site'
const SRC = 'src'

const IS_DEV = process.env.NODE_ENV !== 'production'

const templateData = {config, basepath, IS_DEV, presets}

const paths = {
  js: {
    site: `${SITE}/**/*.js`,
    src: `${SRC}/**/*.js`
  },
  scss: {
    src: `${SRC}/*/index.scss`,
  },
  css: {
    vendor: `${SRC}/vendor/css/*.css`
  },
  html: {
    page: `${SITE}/*.html`,
    debug: `${SITE}/bed/*.html`
  },
  layout: {
    default: `${SRC}/view/default.njk`
  },
  data: `${SITE}/data/**/*.*`,
  img: `${SITE}/**/*.{svg,png}`
}

// js
asset(paths.js.site)
  .assetOptions({read: false})
  .watch(paths.js.site, paths.js.src)
  .pipe(bundler({transform: 'babelify'}))

// infrastructure.js
asset(`${SRC}/infrastructure/infrastructure.js`)
  .watch(`${SRC}/infrastructure/*.js`)
  .base(`${SRC}/infrastructure`)
  .pipe(bundler({transform: 'babelify'}))

// html
asset(paths.html.page, paths.html.debug)
  .base(SITE)
  .watch(paths.html.page, paths.html.debug, paths.layout.default)
  .pipe(frontMatter())
  .pipe(layout1.nunjucks(paths.layout.default, { data: templateData }))

// data
asset(paths.data).base(SITE)

// images
asset(paths.img).base(SITE)

// css
asset(paths.css.vendor).base(SRC)
asset(paths.scss.src).base(SRC)
  .pipe(sass())

bulbo.debugPagePath('__pairs__')

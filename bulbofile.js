const bulbo = require('bulbo')
const asset = bulbo.asset

const bundler = require('bundle-through')
const frontMatter = require('gulp-front-matter')
const layout1 = require('layout1')
const postcss = require('gulp-postcss')
const atImport = require('postcss-import')
const rename = require('gulp-rename')
const path = require('path')

const config = {lang: 'en'}
const presets = require('./src/debug/ls-switch/presets')
const basepath = process.env.BASEPATH || ''
const SRC = 'src'

const IS_DEV = process.env.NODE_ENV !== 'production'

const templateData = {config, basepath, IS_DEV, presets}

const paths = {
  js: {
    entry: `${SRC}/*/index.js`,
    all: `${SRC}/**/*.js`
  },
  css: {
    src: [`${SRC}/*/index.css`, `${SRC}/common/cell.css`],
    all: `${SRC}/**/*.css`
  },
  html: {
    page: `${SRC}/*/index.html`,
    data: `${SRC}/*/data/*.html`
  },
  layout: {
    default: `${SRC}/common/layout.njk`
  },
  vendor: `${SRC}/vendor/**/*.*`,
  data: `${SRC}/data/**/*.*`,
  img: `${SRC}/**/*.{svg,png}`
}

// js
asset(paths.js.entry)
  .assetOptions({ read: false })
  .watch(paths.js.entry, paths.js.all)
  .pipe(bundler({ transform: 'babelify' }))

// html
asset(paths.html.page)
  .watch(paths.html.page, paths.layout.default)
  .pipe(frontMatter())
  .pipe(rename(p => {
    p.basename = path.basename(p.dirname)
    p.dirname = path.dirname(p.dirname)
  }))
  .pipe(layout1.nunjucks(paths.layout.default, { data: templateData }))

// css
asset(paths.css.src)
  .watch(paths.css.src, paths.css.all)
  .pipe(postcss([atImport()]))

// data
asset(paths.data)
asset(paths.html.data)

// images
asset(paths.img)

// vendor things
asset(paths.vendor)

bulbo.base(SRC)
bulbo.debugPagePath('__pairs__')

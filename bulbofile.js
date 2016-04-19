const bulbo = require('bulbo')
const asset = bulbo.asset
const through2 = require('through2')
const browserify = require('browserify')

const $ = require('gulp-load-plugins')()
const config = {lang: 'en'}
const SITE = 'site'
const SRC = 'src'

const transformBrowserify = through2.obj(function (file, enc, callback) {
    file.contents = browserify(file.path).transform('babelify').bundle()
    this.push(file)
    callback()
})

// js
asset(`${ SITE }/**/*.js`)
.assetOptions({read: false})
.watch(`${ SITE }/**/*.js`, `${ SRC }/**/*.js`)
.pipe(transformBrowserify)

// infrastructure.js
asset(`${ SRC }/infrastructure/infrastructure.js`)
.watch(`${ SRC }/infrastructure/*.js`)
.base(`${ SRC }/infrastructure`)
.pipe(transformBrowserify)

// html
asset(`${ SITE }/*.html`)
.watch(`${ SITE }/*.html`, `${ SITE }/layout/*.nunjucks`)
.pipe($.frontMatter())
.pipe($.wrap({src: `${ SITE }/layouts/layout.nunjucks`}, {configJSON: JSON.stringify(config)}, {engine: 'nunjucks'}))

// others
asset(`${ SITE }/data/**/*`).base(SITE)
asset(`${ SITE }/img/**/*`).base(SITE)
asset(`${ SITE }/css/**/*`).base(SITE)

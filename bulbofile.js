const bulbo = require('bulbo')
const asset = bulbo.asset
const through = require('through')
const browserify = require('browserify')

const $ = require('gulp-load-plugins')()
const config = {lang: 'en'}
const SITE = 'site'
const SRC = 'src'

// js
asset(`${ SITE }/**/*.js`)
.assetOptions({read: false})
.watch(`${ SITE }/**/*.js`, `${ SRC }/**/*.js`)
.pipe(through(function (file) {
    file.contents = browserify(file.path).transform('babelify').bundle()
    this.queue(file)
}))

// html
asset(`${ SITE }/*.html`)
.watch(`${ SITE }/*.html`, `${ SITE }/layout/*.nunjucks`)
.pipe($.frontMatter())
.pipe($.wrap({src: `${ SITE }/layouts/layout.nunjucks`}, {configJSON: JSON.stringify(config)}, {engine: 'nunjucks'}))

// others
asset(`${ SITE }/data/**/*`).base(SITE)
asset(`${ SITE }/img/**/*`).base(SITE)
asset(`${ SITE }/css/**/*`).base(SITE)

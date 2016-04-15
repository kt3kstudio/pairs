import {asset} from 'bulbo'
import loadPlugins from 'gulp-load-plugins'
import through from 'through'
import browserify from 'browserify'

const $ = loadPlugins()
const config = {lang: 'en'}
const SITE = 'site'
const SRC = 'src'

// js
asset(`${ SITE }/**/*.js`)
.assetOptions({read: false})
.watch(`${ SITE }/**/*.js`)
.watch(`${ SRC }/**/*.js`)
.pipe(through(function (file) {
    file.contents = browserify(file.path).transform('babelify').bundle()
    this.queue(file)
}))

// html
asset(`${ SITE }/*.html`)
.watch(`${ SITE }/*.html`)
.watch(`${ SITE }/layout/*.nunjucks`)
.pipe($.frontMatter())
.pipe($.wrap({src: `${ SITE }/layouts/layout.nunjucks`}, {configJSON: JSON.stringify(config)}, {engine: 'nunjucks'}))

// others
asset(`${ SITE }/data/**/*.*`).base(SITE)
asset(`${ SITE }/img/**/*.*`).base(SITE)
asset(`${ SITE }/css/**/*.*`).base(SITE)

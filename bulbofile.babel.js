import {asset} from 'bulbo'
import loadPlugins from 'gulp-load-plugins'
import through from 'through'
import browserify from 'browserify'

const $ = loadPlugins()
const config = {lang: 'en'}
const SITE = 'site/'
const SRC = 'src/'

asset(SITE + '**/*.js', {
    read: false,
    watch: [SITE + '**/*.js', SRC + '**/*.js']
})(src => src
    .pipe(through(function (file) {
        file.contents = browserify(file.path).transform('babelify').bundle()
        this.queue(file)
    })))

asset(SITE + '*.html')(src => src
    .pipe($.frontMatter())
    .pipe($.wrap({src: SITE + 'layouts/layout.nunjucks'}, {configJSON: JSON.stringify(config)}, {engine: 'nunjucks'})))

asset([
    SITE + 'data/**/*.*',
    SITE + 'images/**/*.*',
    SITE + 'stylesheets/**/*.*'
], {base: SITE})

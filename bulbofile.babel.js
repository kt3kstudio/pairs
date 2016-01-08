import {asset} from 'bulbo'
import loadPlugins from 'gulp-load-plugins'
import through from 'through'
import browserify from 'browserify'
const $ = loadPlugins()
const config = {lang: 'en'}

asset('m/**/*.js', {
    read: false,
    watch: ['m/**/*.js', 'src/**/*.js']
})(src =>
    src
    .pipe(through(function (file) {
        file.contents = browserify(file.path).transform('babelify').bundle()
        this.queue(file)
    })))

asset('m/*.html')(src =>
    src
    .pipe($.frontMatter())
    .pipe($.wrap({src: 'm/layouts/layout.nunjucks'}, {configJSON: JSON.stringify(config)}, {engine: 'nunjucks'})))

asset([
    'm/data/**/*.*',
    'm/images/**/*.*',
    'm/stylesheets/**/*.*'
], {base: 'm/'})

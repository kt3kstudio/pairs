import {asset} from 'bulbo'
import loadPlugins from 'gulp-load-plugins'
const $ = loadPlugins()
const config = {lang: 'en'}

asset('m/**/*.js', {base: 'm/'})

asset('m/*.html', {base: 'm/'})(src => src
  .pipe($.frontMatter())
  .pipe($.wrap({src: 'm/layouts/layout.nunjucks'}, {configJSON: JSON.stringify(config)}, {engine: 'nunjucks'})))

asset([
  'm/data/**/*.*',
  'm/images/**/*.*',
  'm/stylesheets/**/*.*'
], {base: 'm/'})

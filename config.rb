# middleman config file
# see http://middlemanapp.com/

require 'yaml'

BASE_DIR = ENV['BASE_DIR']

set :source, 'm'

set :build_dir, File.join(BASE_DIR, ENV['BUILD_DIR'] || 'build')

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

ready do
  # bower components
  sprockets.append_path File.join root, 'bower_components'

  # bower components
  sprockets.append_path File.join BASE_DIR, 'bower_components'

  # main implementations
  sprockets.append_path File.join root, 'src'

  # infrastructure implementations in the parent project
  sprockets.append_path File.join BASE_DIR, 'infrastructure'
end



# This config goes to the browser's window.config,
# mainly for debug purpose.
config = {}


# develop mode configuration
configure :development do

  config['language'] = 'en'

end


# build time settings
configure :build do

  activate :minify_css
  activate :minify_javascript

end


set :config, config

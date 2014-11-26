# middleman config file
# see http://middlemanapp.com/

require 'yaml'

BASE_DIR = ENV['BASE_DIR'] || root

DEFAULT_MIDDLEMAN_SOURCE = 'm'
DEFAULT_JAVASCRIPT_SOURCE = 'src'
DEFAULT_BUILD_DIR = 'p'
DEFAULT_INFRASTRUCTURE_SOURCE = 'infrastructure'
DEFAULT_LANGUAGE_CODE = 'en'

set :source, DEFAULT_MIDDLEMAN_SOURCE

set :build_dir, File.join(BASE_DIR, (ENV['BUILD_DIR'] || DEFAULT_BUILD_DIR))

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

ready do
  # bower components
  sprockets.append_path File.join root, 'bower_components'

  # bower components
  sprockets.append_path File.join BASE_DIR, 'bower_components'

  # main implementations
  sprockets.append_path File.join root, DEFAULT_JAVASCRIPT_SOURCE

  # infrastructure implementations in the parent project
  sprockets.append_path File.join BASE_DIR, DEFAULT_INFRASTRUCTURE_SOURCE
end



# This config goes to the browser's window.config,
# mainly for debug purpose.
config = {}


# develop mode configuration
configure :development do

  config['language'] = DEFAULT_LANGUAGE_CODE

end


# build time settings
configure :build do

  activate :minify_css
  activate :minify_javascript

end


set :config, config

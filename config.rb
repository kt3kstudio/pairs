# middleman config file
# see http://middlemanapp.com/

require 'yaml'

parent_dir = '../../'

config_path = parent_dir + 'ld-middleman-option.yml'

# load platform specific middleman settings
platform_settings = File.exist?(config_path) ? YAML.load_file(config_path) : {}

set :source, 'm'

set :build_dir, platform_settings.has_key?('build_dir') ? parent_dir + platform_settings['build_dir'] : 'middleman-build'

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

ready do
  sprockets.append_path File.join root, "bower_components"
  sprockets.append_path File.join root, "../../bower_components" # bower components of the parent project
  sprockets.append_path '../src' # main implementations
  sprockets.append_path '../../../infrastructure' # infrastructure implementations in the parent project
end



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

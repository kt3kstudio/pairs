
.PHONY: doc build

doc:
	jsduck --config=.jsduck.dev.json

doc-release:
	g rm -rf doc/v*
	jsduck --config=.jsduck.release.json

build:
	bundle exec middleman build

server:
	bundle exec middleman server

tree:
	tree m src

lines:
	find src/ -name '*.js' | xargs wc

lint:
	jshint src spec

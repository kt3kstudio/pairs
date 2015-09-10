
.PHONY: doc build

doc:
	jsduck --config=.jsduck.dev.json

doc-release:
	git rm -rf doc/v*
	jsduck --config=.jsduck.release.json
	git add doc

build:
	bundle exec middleman build

server:
	bundle exec middleman server

tree:
	tree m src

lines:
	find src/ spec/ -name '*.js' | xargs wc

lint:
	jshint src spec

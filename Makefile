
.PHONY: doc build

doc:
	jsduck --config=.jsduck.dev.json

doc-release:
	jsduck --config=.jsduck.release.json

build:
	bundle exec middleman build

server:
	bundle exec middleman server

tree:
	tree m src

lines:
	find src/ -name '*.js' | xargs wc

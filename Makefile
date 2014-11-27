
.PHONY: doc build

doc:
	jsduck --config=.jsduck.dev.json

build:
	bundle exec middleman build

server:
	bundle exec middleman server

tree:
	tree m src

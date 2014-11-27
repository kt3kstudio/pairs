
.PHONY: doc build

doc:
	jsduck --config=.jsduck.json

build:
	bundle exec middleman build

server:
	bundle exec middleman server

tree:
	tree m src

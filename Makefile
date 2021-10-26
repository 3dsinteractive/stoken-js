.PHONY: setup
setup:
	yarn global add typescript eslint
	yarn add @typescript-eslint/eslint-plugin @typescript-eslint/parser \
		eslint eslint-config-node eslint-config-prettier eslint-plugin-node eslint-plugin-prettier \
		prettier ts-loader typescript webpack webpack-cli webpack-dev-server \
		node-sass sass-loader style-loader css-loader mini-css-extract-plugin
.PHONY: init
init:
	eslit --init
.PHONY:
npm-publish:
	npm publish
.PHONY:
npm-link:
	npm link
.PHONY:
npm-login:
	npm login
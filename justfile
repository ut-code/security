setup: 
	yarn install;
	go mod tidy

prepare-deploy:
	just setup
	just build
deploy:
	just serve

start: build 
	just serve

build:
	@# build doc
	yarn build
	@# build server
	go build -o serve .

serve:
	./serve



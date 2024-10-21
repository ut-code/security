setup: 
	yarn install;
	go mod tidy

prepare-deploy:
	make setup
	make build
deploy:
	make serve

start: build 
	make serve

build:
	@# build doc
	yarn build
	@# build server
	go build -o serve .

serve:
	./serve



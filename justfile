setup: 
	yarn install;
	go mod tidy

start: build 
	just serve

build:
	yarn build
	go build -o serve .

serve:
	./serve



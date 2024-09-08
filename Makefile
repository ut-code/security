setup: 
	yarn install;
	go mod tidy

start: build 
	make serve

build:
	yarn build
	go build -o serve .

serve:
	./serve



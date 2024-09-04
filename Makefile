setup: 
		yarn install;
		cd ./practice-sql; npm ci; npx prisma generate

start:build serve

build:
		yarn build;

serve:
		node main.mjs;



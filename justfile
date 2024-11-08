default: watch
start: build 
    bun preview
build: prepare
    bun run build
watch: prepare
    bun watch
test: prepare
    bunx tsc --noEmit
    bun test
prepare:
    bun prepare/index.ts


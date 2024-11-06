default: watch
start: build 
    just serve
build: 
    bun run build
watch:
    trap 'kill 0' EXIT; \
        just watch:services & \
        bun watch:web & \
        wait
test: test-srv
setup: 
    bun install
    cd services; bun install
prepare: prepare-srv

# srvs
watch-srv:
    todo
# run locally
prepare-srv:
    cd services; bun i
    cd services; bun sql/prepare.ts
    just test-srv
test-srv:
    cd services; bunx tsc --noEmit
    cd services; bun test

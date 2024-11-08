default: watch
setup:
    bun install
    just _prepare
start: build
    bun preview
build: _prepare
    bun run build
watch: _prepare
    bun watch
check: _prepare _test
    biome lint
    bunx prettier . --check
fix: _prepare _test
    biome lint --fix
    bunx prettier . --write

# individual commands
_test:
    bun test
_prepare:
    bun prepare/index.ts

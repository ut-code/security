default: watch
setup:
    bun install
    lefthook install || true # it's ok to fail
    just _prepare
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

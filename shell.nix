{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  packages = with pkgs; [
    bun
    nodejs_22
    biome
    lefthook
    just
  ];
}

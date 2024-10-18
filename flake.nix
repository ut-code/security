{
  description = "ut.code(); 五月祭・駒場祭企画 「ハッカーになろう」";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/master";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShell = pkgs.mkShell {
          nativeBuildInputs = [ pkgs.bashInteractive ];
          buildInputs = with pkgs; [
            nodePackages."@astrojs/language-server"
            biome
            bun
            go
            gnumake
            lefthook
          ];

          shellHook = ''
            lefthook install
          '';
        };
      });
}

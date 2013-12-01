#!/bin/bash

command=$1

set -eu

cd "$(dirname "$0")"

paths=(
  "BabelExt.js"
  "extension.js"
  "modules"
  "vendor/fancy-settings/source"
)
extensions=("Chrome" "Firefox/data" "Opera" "Safari.safariextension")

makelink() {
  local path="$1"

  for extension in "${extensions[@]}"; do

    pathbasename="${path##*/}"
    pathdirname=""

    if [ "$pathbasename" != "$path" ]; then
      pathdirname="${path%/*}/"
    fi

    if [ "extension" == "Opera" ]; then
      if [[ "$pathbasename" == *.user.js || "$pathbasename" == *.css ]]; then
        dest="./${extension}/includes/${pathdirname}"
      else
        dest="./${extension}/modules/${pathdirname}"
      fi
    else
      dest="./${extension}/${pathdirname}"
    fi
    echo "Re-linking: ${dest}${pathbasename}"
    rm -f "${dest}${pathbasename}"

    if [ "$command" != "clean" ]; then
      mkdir -p "$dest"
      ln "./lib/${path}" "$dest"
    fi
  done
}

traverse() {
  local path="$1"

  if [ -d "./lib/$path" ]; then
    for subpath in ./lib/$path/*; do
      traverse "${subpath/#.\/lib\//}"
    done
  else
    makelink "$path"
  fi
}

for path in "${paths[@]}"; do
  traverse "$path"
done


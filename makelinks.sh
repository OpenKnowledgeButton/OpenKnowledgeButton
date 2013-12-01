#!/bin/bash

command=$1

set -eu

cd "$(dirname "$0")"

files=(
  "BabelExt.js"
  "extension.js"
  "modules/annotateit.js"
)
paths=("Chrome" "XPI/data" "Opera" "Safari.safariextension")

for scriptpath in "${files[@]}"
do
  for ext in "${paths[@]}"
  do

    scriptbasename="${scriptpath##*/}"
    scriptdirname=""

    if [ "$scriptbasename" != "$scriptpath" ]; then
      scriptdirname="${scriptpath%/*}/"
    fi

    if [ "$ext" == "Opera" ];
    then
      if [[ "$scriptbasename" == *.user.js || "$scriptbasename" == *.css ]];
      then
        dest="./${ext}/includes/${scriptdirname}"
      else
        dest="./${ext}/modules/${scriptdirname}"
      fi
    else
      dest="./${ext}/${scriptdirname}"
    fi
    echo "Re-linking: ${dest}${scriptbasename}"
    rm -f "${dest}${scriptbasename}"

    if [ "$command" != "clean" ];
    then
      mkdir -p "$dest"
      ln "./lib/${scriptpath}" "$dest"
    fi
  done
done



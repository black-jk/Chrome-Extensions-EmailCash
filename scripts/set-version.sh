#!/bin/bash

version="${1}"
if [ "${1}" ]; then
	sed -i "s/version: '.*'/version: '${version}'/g" configuration.js
	sed -i "s/\"version\": \".*\"/\"version\": \"${version}\"/g" manifest.json
fi

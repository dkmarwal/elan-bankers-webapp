#!/bin/bash

npm install;
npm run build;
rm package*;
rm -rf node_modules;
cd webserver;
npm install;
npm run build;
mv dist ../dist;
mv node_modules ../node_modules;
mv package* ../;
cd ..;
rm -rf webserver;
rm -rf public;
rm -rf scripts;
rm -rf config;
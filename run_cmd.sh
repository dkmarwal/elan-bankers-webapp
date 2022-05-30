#!/bin/bash
cd /bmw_banker
kill $(lsof -t -i:8094)
nohup npm run prod > /var/log/nodejs_bmw_banker.$(date +"%FT%T").log 2> /var/log/nodejs_bmw_banker_error.$(date +"%FT%T").log < /dev/null &
#!/usr/bin/env bash

curl -s -X POST -H "Cache-Control: no-cache" -H "Content-Type: application/x-www-form-urlencoded" -d "api_key=${travisApiKey}&format=json&type=1&url=https://google.co.uk&friendly_name=TravisOne" "https://api.uptimerobot.com/v2/newMonitor"

curl -s -X POST -H "Cache-Control: no-cache" -H "Content-Type: application/x-www-form-urlencoded" -d "api_key=${travisApiKey}&format=json&type=1&url=http://chrisyocumissuperawesome.com&friendly_name=TravisTwo" "https://api.uptimerobot.com/v2/newMonitor"

curl -s -X POST -H "Cache-Control: no-cache" -H "Content-Type: application/x-www-form-urlencoded" -d "api_key=${travisApiKey}&format=json&type=1&url=https://ebay.com&friendly_name=TravisThree" "https://api.uptimerobot.com/v2/newMonitor"

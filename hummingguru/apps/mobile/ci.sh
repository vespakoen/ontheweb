#!/bin/bash

echo "Running CI for HummingGuru on OSX"

cd /Users/vagrant/hummingguru
npm install
fastlane ios test
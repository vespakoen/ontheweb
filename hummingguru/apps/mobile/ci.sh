#!/bin/bash

echo "Running CI for HummingGuru on OSX"

sudo gem install fastlane --verbose
fastlane testflight
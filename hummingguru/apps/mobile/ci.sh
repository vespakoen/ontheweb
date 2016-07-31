#!/bin/bash

echo "Running CI for HummingGuru on OSX"

cd /Users/vagrant/hummingguru
sudo gem install fastlane --verbose
fastlane ios testflight
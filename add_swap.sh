#!/bin/bash

cd /
dd if=/dev/zero of=swapfile bs=1M count=3000
mkswap swapfile
swapon swapfile
echo "/swapfile none swap sw 0 0" >> etc/fstab
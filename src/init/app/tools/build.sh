#!/usr/bin/env bash
set -e
adb start-server
adb devices

sleep 5

echo ">> Deleting app..."
adb shell pm uninstall nl.hanze.wobbe
adb shell am force-stop nl.hanze.wobbe

cordova run --device


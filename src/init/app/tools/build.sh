#!/usr/bin/env bash
set -e
adb start-server
adb devices

sleep 5

echo ">> Closing app on phone..."
adb shell am force-stop nl.hanze.wobbe

echo ">> Deleting app..."
adb shell pm uninstall nl.hanze.wobbe


cordova run --device

adb logcat | grep -iE "wobbe|web console"

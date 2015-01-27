#!/bin/bash

ionic platform remove android
ionic platform add android

cordova plugin add https://github.com/wildabeast/BarcodeScanner.git
cordova plugin add https://github.com/chariotsolutions/phonegap-nfc.git


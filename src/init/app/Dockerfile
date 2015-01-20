FROM ugnb/ubuntu-cordova-android-build
MAINTAINER Maurits van Mastrigt <maurits@nerdieworks.nl>

RUN apt-get update && apt-get install usbutils
RUN npm install -g ionic

WORKDIR /data

VOLUME ["/data", "/dev/bus/usb"]

CMD ["/var/tools/build.sh"]

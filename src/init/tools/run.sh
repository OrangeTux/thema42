#!/bin/bash

# Navigate to base directory
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # Resolve $SOURCE until the file is no longer a symlink
    DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
    SOURCE="$(readlink "$SOURCE")"
    [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # Resolve symlink
done
DIR="$(cd -P "$(dirname "$SOURCE")" && pwd)"
cd "$DIR"

# Run container
docker run -it --privileged \
	-v $(realpath $(pwd)/../../app):/data \
	-v /dev/bus/usb:/dev/bus/usb \
	-v $(realpath $(pwd)/.):/var/tools \
	thema42_app $@

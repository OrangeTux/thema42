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

# Create if image (if not present)
if [ $(docker images | tail -n +2 | awk '{print $1}' | grep 'thema42_app' | wc -l) -eq 0 ]; then
	docker build -t="thema42_app" .
fi

# Run container
docker run -it --privileged \
	-v $(realpath $(pwd)/../../app):/data \
	-v $(pwd)/tools:/var/tools \
	thema42_app $@


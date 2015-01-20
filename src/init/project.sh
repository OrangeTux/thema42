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

# Output formatting
echo_success () {
    echo -ne "\033[32m$*\033[0m"
}

echo_warning () {
    echo -ne "\033[33m$*\033[0m"
}

echo_error () {
    echo -ne "$*" 1>&2
}

# Fig
FIG_PROJECT_NAME="$(cat project-name)"

fig () {
    /usr/local/bin/fig -p $FIG_PROJECT_NAME $@
}

project_start () {
    fig up -d --no-recreate
}

project_stop () {
    fig stop
}

project_confirm () {
    read -p "$1 " -n 1 -r
    echo # Move to new line
    [[ $REPLY =~ ^[Yy]$ ]]
}

project_clean () {
    if ! project_confirm "Are you sure [yN]?"; then
        return 1
    fi

    project_stop

    fig stop
    fig rm --force
    docker rmi "${FIG_PROJECT_NAME}_web"
}

project_ps () {
    fig ps
}

project_update() {
    docker exec -t project_web_1 /var/tools/update.sh
}

project_invalid () {
    echo_error "Invalid command: ${1-"<empty>"}\n"
    exit 1
}

# Commands
case "$1" in
    start)  shift; project_start;;
    stop)   shift; project_stop;;
    clean)  shift; project_clean;;
    ps)     shift; project_ps;;
    update) shift; project_update;;
    *) project_invalid $@;;
esac


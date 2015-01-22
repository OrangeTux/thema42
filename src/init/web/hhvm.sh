#!/bin/sh

export LANG="nl_NL.UTF-8"
export LC_ALL="nl_NL.UTF-8"

exec hhvm --mode server \
    --config /etc/hhvm/php.ini \
    --config /etc/hhvm/server.ini \
    -vServer.Type=fastcgi -vServer.Port=9000


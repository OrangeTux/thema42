#!/bin/sh

export LANG="nl_NL.UTF-8"
export LC_ALL="nl_NL.UTF-8"

exec hhvm --mode server -vServer.Type=fastcgi -vServer.Port=9000


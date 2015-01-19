#!/bin/sh

# Expose some environment variables to HHVM
DOLLAR='$' envsubst < /etc/nginx/hhvm.conf.tpl > /etc/nginx/hhvm.conf

/usr/sbin/nginx


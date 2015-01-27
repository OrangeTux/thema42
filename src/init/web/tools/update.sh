#!/bin/bash

cd /var/www/html
composer update -v
php artisan migrate --force --package=cartalyst/sentry
php artisan migrate --force


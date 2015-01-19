location ~ \.(hh|php)$ {
    fastcgi_keep_conn on;
    fastcgi_pass   127.0.0.1:9000;
    fastcgi_index  index.php;
    fastcgi_param  SCRIPT_FILENAME ${DOLLAR}document_root${DOLLAR}fastcgi_script_name;

    # Param names must match system environment names to allow `php artisan` to function.
    fastcgi_param  WEB_ENV "${WEB_ENV}";
    fastcgi_param  MYSQL_PORT_3306_TCP_ADDR "${MYSQL_PORT_3306_TCP_ADDR}";
    fastcgi_param  MYSQL_ENV_MYSQL_DATABASE "${MYSQL_ENV_MYSQL_DATABASE}";
    fastcgi_param  MYSQL_ENV_MYSQL_ROOT_PASSWORD "${MYSQL_ENV_MYSQL_ROOT_PASSWORD}";

    include        fastcgi_params;
}


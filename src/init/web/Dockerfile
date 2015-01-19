# This base uses phusion/baseimage to solve some common problems with Docker containers.
# Also see: https://github.com/phusion/baseimage-docker

FROM phusion/baseimage:0.9.15
MAINTAINER Maurits van Mastrigt <maurits@nerdieworks.nl>
ENV HOME /home

# Prepare Ubuntu
RUN sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list && \
    apt-get update && \
    apt-get -y upgrade && \
    apt-get install -y build-essential && \
    apt-get install -y software-properties-common && \
    apt-get install -y byobu curl git htop man unzip vim wget

# Disable SSH
RUN rm -rf /etc/service/sshd /etc/my_init.d/00_regen_ssh_host_keys.sh

# Install HHVM
RUN wget -O - http://dl.hhvm.com/conf/hhvm.gpg.key | apt-key add - && \
    echo deb http://dl.hhvm.com/ubuntu trusty main | tee /etc/apt/sources.list.d/hhvm.list && \
    apt-get update && \
    apt-get install -y hhvm

# Install php tools (composer / phpunit)
RUN cd $WORKDIR && \
    wget http://getcomposer.org/composer.phar && \
    chmod +x composer.phar && \
    mv composer.phar /usr/local/bin/composer && \
    wget https://phar.phpunit.de/phpunit.phar && \
    chmod +x phpunit.phar && \
    mv phpunit.phar /usr/local/bin/phpunit

# Add Dutch locale
RUN locale-gen nl_NL.UTF-8 && \
    /usr/sbin/update-locale LANG="nl_NL.UTF-8" LANGUAGE="nl_NL.UTF-8" LC_ALL="nl_NL.UTF-8" LC_CTYPE="C"

# Install FastCGI
RUN /usr/share/hhvm/install_fastcgi.sh && \
    update-rc.d hhvm defaults
 
# Fix Composer timeout issues (with HHVM)
# Fix from: http://stackoverflow.com/questions/23471864/installing-composer-using-vagrant-hhvm-and-ubuntu-14-04
RUN echo "hhvm.resource_limit.socket_default_timeout = 30" >> /etc/hhvm/php.ini && \
    echo "hhvm.http.slow_query_threshold = 30000" >> /etc/hhvm/php.ini

# Install Nginx
RUN add-apt-repository -y ppa:nginx/stable && \
    apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/* && \
    echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
    chown -R www-data:www-data /var/lib/nginx

# Cleanup
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*kk

# Add Nginx service
RUN mkdir /etc/service/nginx
ADD nginx.sh /etc/service/nginx/run

# Add HHVM service
RUN mkdir /etc/service/hhvm
ADD hhvm.sh /etc/service/hhvm/run

# Add HHVM Nginx configuration template
ADD hhvm.conf.tpl /etc/nginx/

# Configure
WORKDIR /var/www/html

VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs", "/etc/nginx/conf.d", \
    "/var/log/nginx", "/var/www/html", "/var/tools"]

EXPOSE 80
EXPOSE 443

CMD ["/sbin/my_init"]


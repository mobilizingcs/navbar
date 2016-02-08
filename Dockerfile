FROM nginx:latest
MAINTAINER Steve Nolen <technolengy@gmail.com>

WORKDIR /var/www
ADD . /var/www
RUN cp docker_entrypoint.sh /run.sh \
  && chmod +x /run.sh

RUN chown -R nginx.nginx /var/www

RUN ln -s /ohmage-frontends /var/www/webapps \
  && ln -s /var/www/webapps /var/www/navbar

EXPOSE 80

CMD ["/run.sh"]
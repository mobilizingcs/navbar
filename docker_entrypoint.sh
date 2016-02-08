#!/usr/bin/env bash

echo 'server {
  listen       80;
  server_name  localhost;

  location / {
    root   /var/www;
    index  index.html index.htm;
  }' > /etc/nginx/conf.d/default.conf


if [ -n "$OHMAGE_PORT_8080_TCP_PORT" ]; then
  echo '  location /app/ {
      proxy_pass http://ohmage:8080/app/;
      proxy_read_timeout  600s;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header        Host $http_host;
  }' >> /etc/nginx/conf.d/default.conf
fi

echo '
}' >> /etc/nginx/conf.d/default.conf

exec /usr/sbin/nginx -g "daemon off;"
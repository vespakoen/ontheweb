FROM nginx:1.9.6

COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx/mime.types /etc/nginx/mime.types
COPY docker/nginx/default /etc/nginx/sites-enabled/default
COPY public /www

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]

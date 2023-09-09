FROM nginx:latest
COPY dist /var/www/mysite
COPY ./mysite.conf /etc/nginx/conf.d/default.conf

FROM nginx:latest
COPY dist/lemon-mart /var/www/mysite
COPY ./mysite.conf /etc/nginx/conf.d/default.conf

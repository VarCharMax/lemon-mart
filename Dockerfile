FROM nginx:1.29.4-trixie
COPY dist/lemon-mart /var/www/mysite
COPY ./mysite.conf /etc/nginx/conf.d/default.conf

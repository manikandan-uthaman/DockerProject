FROM httpd:alpine

RUN sed -i '/ScriptAlias \/cgi-bin\// i Alias \/todo "\/usr\/local\/apache2\/htdocs\/"' /usr/local/apache2/conf/httpd.conf

COPY ./dist/* /usr/local/apache2/htdocs/

COPY ./proxy-conf.txt /usr/local/apache2/conf/proxy-conf.txt

WORKDIR /usr/local/apache2/conf

RUN sed -i '/<\/IfModule>/ r proxy-conf.txt' httpd.conf

EXPOSE 80

CMD ["httpd-foreground"]
FROM httpd:alpine

RUN sed -i '/ScriptAlias \/cgi-bin\// i Alias \/todo "\/usr\/local\/apache2\/htdocs\/"' /usr/local/apache2/conf/httpd.conf

COPY ./dist/* /usr/local/apache2/htdocs/
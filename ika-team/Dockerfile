FROM tutum/lamp:latest

RUN apt-get install -y sshfs

RUN mkdir /root/.ssh/
COPY id_rsa /root/.ssh/id_rsa
RUN chmod -R 700 /root/.ssh/

COPY src/ /var/www/html/

RUN mkdir -p /var/www/html/logs
RUN mkdir -p /var/www/html/log
RUN chown -R www-data:www-data /var/www/html/log

ADD start.sh /bin/start.sh
RUN chmod +x /bin/start.sh 

CMD ["/bin/start.sh"]

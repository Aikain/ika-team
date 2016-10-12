FROM tutum/lamp:latest

RUN apt-get install -y sshfs

RUN mkdir /root/.ssh/
COPY id_rsa /root/.ssh/id_rsa
COPY src/ /var/www/html/

RUN mkdir -p /var/www/html/logs

CMD sshfs -o allow_other,defer_permissions,IdentityFile=~/.ssh/id_rsa aikain@troll.paivola.fi:.irssi/log/ika-team/ /var/www/html/logs

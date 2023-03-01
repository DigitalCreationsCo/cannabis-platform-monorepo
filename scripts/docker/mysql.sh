# docker run --name my-mysql -p 33060:3306 -d mysql:8.0 -e MYSQL_USER=shadowdbuser MYSQL_PASSWORD=secret12536112 MYSQL_DATABASE=shadowdb -v $HOME/mysql-data:/var/lib/mysql
# docker run --name my-mysql -d mysql:8.0 -v $HOME/mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=secret2358260 -e MYSQL_USER=shadowdbuser -e MYSQL_PASSWORD=secret12536112 -e MYSQL_DATABASE=shadowdb -p 33060:3306

# docker container run -p 33060:3306 -v $HOME/mysql-data:/var/lib/mysql --name my-mysql -e MYSQL_USER=shadowdbuser -e MYSQL_PASSWORD=secret12536112 -d mysql:8.0

# docker run \
# --detach \
# --name=my-mysql \
# --env="MYSQL_ROOT_PASSWORD=secret" \
# --publish 6603:3306 \
# # --volume=/root/docker/[container_name]/conf.d:/etc/mysql/conf.d \
# mysql:8.0

# docker run --detach --name=my-mysql -v $HOME/mysql-data:/var/lib/mysql --env="MYSQL_USER=shadowdbuser" --env="MYSQL_PASSWORD=secret12536112" --env="MYSQL_DATABASE=shadowdb" --publish 6603:3306 mysql:8.0

# docker run --detach --name=my-mysql --publish 6603:3306 mysql:8.0

docker run --detach --name=my-mysql --env="MYSQL_ROOT_PASSWORD=secret" --env="MYSQL_DATABASE=shadowdb" --publish 6603:3306 mysql:8.0

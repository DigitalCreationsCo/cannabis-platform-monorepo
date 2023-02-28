docker run --name my-mysql -p 33060:3306 -d mysql:8.0 -e MYSQL_USER=shadowdbuser MYSQL_PASSWORD=secret12536112 MYSQL_DATABASE=shadowdb -v $HOME/mysql-data:/var/lib/mysql

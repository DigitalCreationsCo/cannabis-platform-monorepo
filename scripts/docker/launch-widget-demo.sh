docker run -p 8080:80 --name delivery-widget-demo -v $(pwd)/apps/test-widget-site/build:/usr/share/nginx/html  nginx
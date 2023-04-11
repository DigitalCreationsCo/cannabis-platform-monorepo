import express from 'express';
const app = express();

// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello World!</h1>');
  res.end();
});

// app.get('/', function(req, res) {
//   res.render('delivery-button');
// });

// app.get('/delivery', function(req, res) {
//   res.render('delivery-new');
// });

// const publicDirectoryPath = path.join(__dirname, "./public");
// app.use(express.static(publicDirectoryPath));

app.listen(8080);
console.log(' 🔥Delivery Widget is listening on port 8080');

export default app;
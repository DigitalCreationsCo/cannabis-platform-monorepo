import express from 'express';
import path from 'path';
const app = express();

app.set('view engine', 'ejs');
app.get('/', function(req, res) {
  res.render('pages/delivery-button');
});

// app.get('/delivery', function(req, res) {
//   res.render('pages/delivery-new');
// });

const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));

app.listen(8080);
console.log(' 🔥Delivery Widget is listening on port 8080');
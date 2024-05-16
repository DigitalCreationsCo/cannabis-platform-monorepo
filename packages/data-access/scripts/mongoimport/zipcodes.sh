mongoimport --uri "mongodb+srv://bmejiadeveloper2:ih0TVFyJTnVrM2Bi@delivery-database.ystoeey.mongodb.net/gras?retryWrites=true&w=majority&appName=delivery-database" --collection zipcodes --drop --file ../collections/zips.json

mongoimport --uri "mongodb+srv://bmejiadeveloper2:ih0TVFyJTnVrM2Bi@delivery-database.ystoeey.mongodb.net/gras_dev?retryWrites=true&w=majority&appName=delivery-database" --collection zipcodes --drop --file ../collections/zips.json

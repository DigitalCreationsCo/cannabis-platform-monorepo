// run the mock server on 0.0.0.0 instead of localhost or 127.0.0.1.
// This makes the mock server accessible on the LAN and because Expo requires the development machine and the mobile running the Expo app to be on the same network the mock server becomes accessible too.
// This can be achieved with the following command when using json-server
// json-server --host 0.0.0.0 --port 8000 ./db.json --watch
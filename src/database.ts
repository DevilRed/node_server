// have to have mongoDB already installed
/*
INSTALL MONGODB
sudo apt update
sudo apt install -y mongodb

sudo systemctl status mongodb
sudo systemctl stop mongodb
sudo systemctl start mongodb
sudo systemctl restart mongodb

ENABLE / DISABLE mongoDB from system start up
// By default, MongoDB is configured to start automatically with the server.

sudo systemctl enable mongodb
sudo systemctl disable mongodb
*/

const mongoose = require('mongoose');

// connect to DB, config required
mongoose.connect('mongodb://localhost/notes-db-app', {
	useCreateIndex: true,
	useNewUrlParse: true,
	useFindAndModify: false
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err))


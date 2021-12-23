const mongoose = require('mongoose')
const connectionString = "mongodb://localhost:27017/51900035_51900087_51900231"
if (!connectionString) {
    console.error('MongoDB connection string missing!')
    process.exit(1)
}

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', err => {
    console.error('MongooseDB error: ' + err.message)
})

db.once('open', () => console.log('MongoDB connection established'))
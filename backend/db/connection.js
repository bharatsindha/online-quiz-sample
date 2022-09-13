const mongoose = require('mongoose')

const url = `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`

/**
 * connect to mongo database
 */
mongoose.connect(url, (err, conn) => {
  if (err) {
    console.log('Mongo error ', err)
  } else {
    console.log('Mongoose Connection is Successful')
  }
})

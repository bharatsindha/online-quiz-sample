const faker = require('faker')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const { users } = require('../schemas')

const url = `mongodb://127.0.0.1:27017/quiz`

mongoose.connect(url, (err, conn) => {
  if (err) {
    console.log('Mongo error ', err)
  } else {
    console.log('Mongoose Connection is Successful')
  }
})

function hashPassword(password) {
  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(password, salt)
  return hash
}

async function createUser() {
  let firstName = faker.name.firstName()
  let lastName = faker.name.lastName()
  let hash = hashPassword('123456')
  await users.create({
    firstName: firstName,
    lastName: lastName,
    email: 'bharat@gmail.com',
    password: hash,
  })
  console.log('Created user')
}

async function createSampleData() {
  await createUser()
  mongoose.connection.close()
}

createSampleData()

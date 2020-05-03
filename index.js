const mongoose = require('mongoose')
const express = require('express')
const app = express()

const user = require('./routes/users')
const auth = require('./routes/auth')
app.use(express.json())

app.use('/api/', user)
app.use('/api/', auth)

console.log(process.env.SECRET_KEY_JWT_EX_AUTH)

const port = process.env.PORT || 3003
app.listen(port, () => {
  console.log(`Listening port: ${port}`)
})

mongoose.connect('mongodb://localhost/user-auth', {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to mongodb')
  })
  .catch(error => console.log('Cant connected to DB'))
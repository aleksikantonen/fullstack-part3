const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)

  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    rquired: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: v => {
        return /^(\d{2}-\d{6,}|\d{3}-\d{5,})$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', phonebookSchema)
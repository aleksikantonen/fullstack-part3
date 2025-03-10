const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const personParameters = {
    name: process.argv[3],
    number: process.argv[4],
}

const url = 
`mongodb+srv://fullstack:${password}@cluster0.ru6ka.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

const person = new Person(personParameters)

if (process.argv.length === 3) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person['name'], person['number'])
        })
        mongoose.connection.close()
    })
} else {
    person.save().then(result => {
        console.log(`added ${personParameters['name']} number ${personParameters['number']} to phonebook`)
        mongoose.connection.close()
    })
}
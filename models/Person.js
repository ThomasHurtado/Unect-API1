const mongoose = require('mongoose')

const Person =  mongoose.model('Person', {
    name: String,
    age: Number,
    ra: String,
    cpf: String,
    createdAt: String,
    updatedAt: String
})

module.exports = Person

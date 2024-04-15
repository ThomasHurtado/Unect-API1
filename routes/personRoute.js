const router = require('express').Router()

const Person = require('../models/Person')

const moment = require('moment')



//Criação de dados

router.post('/', async(req, res) => {

    const {name, age, ra, cpf} = req.body //destruturação 

    const person = {
        name,
        age,
        ra,
        cpf,
        createdAt: moment().toDate(),
        updatedAt: 'none'
    }


    try {

        await Person.create(person)

        res.status(201).json({Message: 'Sucesso'})

    } catch (error) {
        res.status(500).json({error})
    }
})

//Leitura de dados

router.get('/', async(req, res) =>{

    try {

        const people = await Person.find()

        res.status(200).json(people)
        
    } catch (error) {
       res.status(500).json({ error: error }) 
    }

})

router.get('/:id', async(req, res) =>{

    const id = req.params.id

    try {
      
        const person = await Person.findOne({_id: id})

        if(!person){
            res.status(422).json({ message: 'O usuario não foi encontrado!'})
            return
        }

        res.status(200).json(person)

    } catch (error) {
      res.status(500).json({ error: error })  
    }
})

//Atualizar dados

router.patch('/:id', async(req, res) =>{

    const id = req.params.id 

    const {name, age, ra, cpf} = req.body

    const person = {
        name,
        age,
        ra,
        cpf,
        updatedAt: moment().toDate()
    }

    try {

        const updatedPerson = await Person.updateOne({_id: id}, person)

        if(updatedPerson.matchedCount  === 0){
            res.status(422).json({ message: 'O usuario não foi encontrado!'})
            return
        }

        res.status(200).json(person)
        
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Deletar Pessoas

router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const person = await Person.findOne({_id: id})

    if(!person){
        res.status(422).json({ message: 'O usuario não foi encontrado!'})
        return
    }
    
    try {
       
        await Person.deleteOne({_id: id})

        res.status(200).json({message: 'Usuario deletado com sucesso!'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
})


module.exports = router
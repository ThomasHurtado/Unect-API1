const router = require('express').Router()

const Aluno = require('../models/Aluno')

const moment = require('moment')



//Criação de dados

router.post('/', async(req, res) => {

    const {name, age, ra, cpf} = req.body //destruturação 

    const aluno = {
        name,
        age,
        ra,
        cpf,
        createdAt: moment().toDate(),
        updatedAt: 'none'
    }


    try {

        await Aluno.create(aluno)

        res.status(201).json({Message: 'Sucesso'})

    } catch (error) {
        res.status(500).json({error})
    }
})

//Ver dados pelo iD
router.get('/:id', async(req, res) =>{

    const id = req.params.id

    try {
      
        const aluno = await Aluno.findOne({_id: id})

        if(!aluno){
            res.status(422).json({ message: 'O usuario não foi encontrado!'})
            return
        }

        res.status(200).json(aluno)

    } catch (error) {
      res.status(500).json({ error: error })  
    }
})

//Ver todos os dados

router.get('/', async(req, res) => {

    let Name = req.query.Name
    let RA = req.query.RA

    if(Name){
        try {

            const aluno = await Aluno.find({name: Name})

            res.status(200).json(aluno)

        } catch (error) {

            res.status(500).json({error: error})
        }

    }else if(RA){
        try {

            const aluno = await Aluno.find({ra: RA})

            res.status(200).json(aluno)

        } catch (error) {
            
            res.status(500).json({error: error})
        }
    }else{
        try {

            const aluno = await Aluno.find()
    
            res.status(200).json(aluno)
            
        } catch (error) {
           res.status(500).json({ error: error }) 
        }
    }


})

//Atualizar dados

router.patch('/:id', async(req, res) =>{

    const id = req.params.id 

    const {name, age, ra, cpf} = req.body

    const aluno = {
        name,
        age,
        ra,
        cpf,
        updatedAt: moment().toDate()
    }

    try {

        const updatedAluno = await Aluno.updateOne({_id: id}, aluno)

        if(updatedAluno.matchedCount  === 0){
            res.status(422).json({ message: 'O usuario não foi encontrado!'})
            return
        }

        res.status(200).json(aluno)
        
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//Deletar Pessoas

router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const aluno = await Aluno.findOne({_id: id})

    if(!aluno){
        res.status(422).json({ message: 'O usuario não foi encontrado!'})
        return
    }
    
    try {
       
        await Aluno.deleteOne({_id: id})

        res.status(200).json({message: 'Usuario deletado com sucesso!'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
})


module.exports = router
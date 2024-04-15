
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const moment = require('moment')

//Ler JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//rotas da api

const personRoutes = require('./routes/personRoute')   

app.use('/person', personRoutes)


// endpoint

app.get('/', (req, res) => {

    //mensagem de requisicao
    res.json({ messe:'Ola!'})
    
})

// mongodb+srv://thomas:<1234>@cluster0.ffydzai.mongodb.net/BancodaAPI?retryWrites=true&w=majority&appName=Cluster0

//Porta desejada
mongoose
    .connect('mongodb+srv://thomas:1234@cluster0.ffydzai.mongodb.net/BancodaAPI?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("Conectamos ao banco")
        app.listen(3000)
    })
    .catch((err) => console.log(err))

const express = require('express')
const mongoose = require('mongoose')
const app = express()


app.use(
    express.urlencoded({
    extended: true,
    }),
)

app.use(express.json())

const cadastroRoutes = require('./router/cadastroRoutes')

app.use('/cadastro', cadastroRoutes)

app.get('/', (req, res) => {
    res.json({message: "Rota home"})
})



mongoose.connect(
    'mongodb+srv://taina:ta131089@cluster0.rwtsq.mongodb.net/bancoCrudNodeJS?retryWrites=true&w=majority')
    .then(() =>{
        console.log('Conetado ao mongo')
        app.listen(3000)
    })

    .catch((err) => console.log(err))


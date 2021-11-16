const router = require('express').Router()
const Cadastro = require('../models/cadastros')


//criando dados
router.post('/', async (req, res) => {
    const{nome, titulos_disponiveis, informacoes_adicionais} = req.body

    if(!nome){
        res.status(422).json({ error: 'Por favor, inserir dados válidos'})
    }
    if(!titulos_disponiveis){
        res.status(422).json({ error: 'Por favor, inserir dados válidos'})
    }
    if(!informacoes_adicionais){
        res.status(422).json({ error: 'Por favor, inserir dados válidos'})
    }

    const cadastro = { nome, titulos_disponiveis, informacoes_adicionais }

    try{
        
        await Cadastro.create(cadastro)
        res.status(201).json({message:' Cadastro inserido com sucesso '})

    }catch (error){
        res.status(500).json({error: error})
    }
})

//lendo todos os dados

router.get('/', async (req, res) => {
    try{

        const cadastros = await Cadastro.find()
        res.status(200).json(cadastros)

    }catch (error){
        res.status(500).json({error: error})
    }
})

//lendo dados por id

router.get('/:id', async (req, res) => {
    const id = req.params.id
    
    try{
        const cadastros = await Cadastro.findOne({_id: id})

       if (!cadastros) {
            res.status(422).json({message: 'Usuário não encontrado'})
            return
        }
        
        res.status(200).json({cadastros})

    }catch (error){
        res.status(500).json({error: error})
    }

})

//atualização de dados

router.patch('/:id', async (req, res) => {
    const id = req.params.body

    const { nome, titulos_disponiveis, informacoes_adicionais } = req.body

    const cadastro = { nome, titulos_disponiveis, informacoes_adicionais }

    try{

        const updatedCadastro = await Cadastro.updateOne({ _id: id}, cadastro)
        
        if(updatedCadastro.matchedCount === 0) {
            res.status(422).json({ message: 'Cadastro não encontrado'})
        }
        
        res.status(200).json(cadastro)

    }catch (error){
        res.status(500).json({error: error})
    }

})

router.delete('/:id', async (req, res) => {

    const id = req.params.id
    const cadastro = await Cadastro.findOne({ _id: id})


    if(!cadastro) {
        res.status(422).json({ message: 'Usuário não encontrado'})
        return
    }

    try{

       await Cadastro.deleteOne({_id: id})
        
        res.status(200).json({message: 'Cadastro removido com sucesso'})

    }catch (error){
        res.status(500).json({error: error})
    }



})

module.exports = router
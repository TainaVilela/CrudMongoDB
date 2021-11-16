const mongoose = require('mongoose')

const Cadastro = mongoose.model('Cadastro', {
    nome: String,
    titulos_disponiveis: String,
    informacoes_adicionais: String
    }
)
module.exports = Cadastro
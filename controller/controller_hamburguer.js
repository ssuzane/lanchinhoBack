const hambuguerDAO = require('../model/DAO/hamburguer.js')
const message = require('../modulo/config.js')

// listar hambuguer

const getListarHambuguer = async function(){

    let hambuguerJSON = {}

    let dadosHambuguer = await hambuguerDAO.selectAllHamburguers()

    if(dadosHambuguer) {
        hambuguerJSON.hamburguer = dadosHambuguer
        hambuguerJSON.quantidade = dadosHambuguer.length
        hambuguerJSON.status_code = 200

        return hambuguerJSON
    }else{
        return false
    }
}

const getBuscarHamburguer = async function(id) {

    let idHamburguer = id

    let hambuguerJSON = {}

    if(idHamburguer == '' || idHamburguer == undefined || isNaN(idHamburguer)) {
        return message.ERROR_INVALID_ID
    }else {
        let dadosHamburguer = await hambuguerDAO.selectByIdHamburgues(idHamburguer)

        if(dadosHamburguer) {
            if(dadosHamburguer.length > 0){
                hambuguerJSON.hamburguer = dadosHamburguer
                hambuguerJSON.status_code = 200

                return hambuguerJSON
            }else
            return message.ERROR_NOT_FOUND
        }else{
            return message.ERRO_INTERNAL_SERVER_DB
        }
    }
}

const setInserirNovoHamburguer = async function(dadosHamburguer, contentType) {

    try {
        if (String(contentType).toLowerCase() === 'application/json') {

            let novoHamburguerJSON = {}

            if (dadosHamburguer.nome === '' || dadosHamburguer.nome === undefined || dadosHamburguer.nome === null || dadosHamburguer.nome.length > 200 ||
                dadosHamburguer.preco === '' || dadosHamburguer.preco === undefined || dadosHamburguer.preco === null || dadosHamburguer.preco.length > 100) 
                {
                    return message.ERROR_REQUIERED_FIELDS;
            }

            let novoHamburguer = await hambuguerDAO.insertHamburguer(dadosHamburguer);

            if (novoHamburguer) {
               
                novoHamburguerJSON.hamburguer = dadosHamburguer,
                novoHamburguerJSON.status = message.SUCESS_CREATED_ITEM.status,
                novoHamburguerJSON.status_code = message.SUCESS_CREATED_ITEM.status_code,
                novoHamburguerJSON.message = message.SUCESS_CREATED_ITEM.message
                

                return novoHamburguerJSON;
            } else {
                return message.ERRO_INTERNAL_SERVER_DB;
            }
        } else {
            return message.ERRO_CONTENT_TYPE;
        }
    } catch (error) {
        console.error('Error ao inserir um novo hamburguer:', error);
        return message.ERRO_INTERNAL_SERVER_DB;
    }
}







module.exports = {
    getListarHambuguer,
    getBuscarHamburguer,
    setInserirNovoHamburguer
}
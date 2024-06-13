const hambuguerDAO = require('../model/DAO/hamburguer.js')
const message = require('../modulo/config.js')


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

const setAtualizarHamburguer = async function(dadosHamburguer, contentType, id){

    try {
        if(String(contentType).toLowerCase() == 'application/json'){

            let resultDadosHamburguer = {}

            if(id === ''|| id === undefined ||
                dadosHamburguer.nome === '' || dadosHamburguer.nome === undefined || dadosHamburguer.nome.length > 200 ||
                dadosHamburguer.preco === '' || dadosHamburguer.preco === undefined || dadosHamburguer.preco.length > 100 
            ){
                return message.ERROR_REQUIERED_FIELDS
            }

            let atualiHamburguer = await hambuguerDAO.upadateHamburguer(dadosHamburguer, id)

            dadosHamburguer.id = id

            console.log(atualiHamburguer);
            if(atualiHamburguer){
                resultDadosHamburguer.status = message.SUCESS_CREATED_ITEM.status
                resultDadosHamburguer.status_code = message.SUCESS_CREATED_ITEM.status_code
                resultDadosHamburguer.ERROR_message = message.SUCESS_CREATED_ITEM.message
                resultDadosHamburguer.hamburguer = dadosHamburguer

                return resultDadosHamburguer
            }else{
                return message.ERRO_INTERNAL_SERVER_DB
            }
        }else{
            return message.ERROR_REQUIERED_FIELDS
        }
    }catch(error){
        console.error(error);
        message.ERRO_INTERNAL_SERVER
    }
}

const setExcluirHamburguer = async function(id){

    try{
        
        let idHamburguer = id

        let validacaoHamburguer = await getBuscarHamburguer(idHamburguer)

        if(idHamburguer == '' || idHamburguer == undefined || isNaN(idHamburguer)){

            return message.ERROR_INVALID_ID
        }else if(validacaoHamburguer.status == false){
            
            return message.ERROR_NOT_FOUND
        }else{

            let resulDados = await hambuguerDAO.deleteHamburguer(idHamburguer)

            if(resulDados){
                return message.SUCESS_CREATED_ITEM
            }else{
                return message.ERRO_INTERNAL_SERVER_DB
            }

        }

    }catch(error){
        console.log(error)
        message.ERRO_INTERNAL_SERVER
    }
}




module.exports = {
    getListarHambuguer,
    getBuscarHamburguer,
    setInserirNovoHamburguer,
    setAtualizarHamburguer,
    setExcluirHamburguer
}
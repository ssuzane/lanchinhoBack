const lancheDAO = require('../model/DAO/lanche.js')
const message = require('../modulo/config.js')

const getListarLanches= async function(){

    let lancheJSON = {}

    let dadosLanche = await lancheDAO.selectAllLanches()

    if(dadosLanche) {
        lancheJSON.lanche = dadosLanche
        lancheJSON.quantidade = dadosLanche.length
        lancheJSON.status_code = 200

        return lancheJSON
    }else{
         return false
    }
}

const getBuscarLanche = async function(id) {

    let idLanche = id

    let lancheJSON = {}

    if(idLanche == '' || idLanche == undefined || isNaN(idLanche)) {
        return message.ERROR_INVALID_ID
    }else{
        let dadosLanche = await lancheDAO.selectByIdLanche(idLanche)

        if(dadosLanche){
            if(dadosLanche.length > 0){
                lancheJSON.lanche = dadosLanche
                lancheJSON.status_code = 200

                return lancheJSON
            }else
            return message.ERROR_NOT_FOUND
        }else{
            return message.ERRO_INTERNAL_SERVER_DB
        }
    }
}

const setInserirNovoLanche = async function(dadosLanche, contentType){

    try{
        if(String(contentType).toLowerCase() === 'application/json') {

            let novoLancheJSON = {}

            if(dadosLanche.nome === '' || dadosLanche.nome === undefined || dadosLanche.nome === null || dadosLanche.nome.length > 200 ||
               dadosLanche.preco === '' || dadosLanche.preco === undefined || dadosLanche.preco === null || dadosLanche.preco.length > 100
            ){
                return message.ERROR_REQUIERED_FIELDS
            }

            let novoLanche = await lancheDAO.insertLanche(dadosLanche)

            if(novoLanche){
                novoLancheJSON.lanche = dadosLanche,
                novoLancheJSON.status = message.SUCESS_CREATED_ITEM.status,
                novoLancheJSON.status_code = message.SUCESS_CREATED_ITEM.status_code,
                novoLancheJSON.message = message.SUCESS_CREATED_ITEM.message

                return novoLancheJSON
            }else{
                return message.ERRO_INTERNAL_SERVER_DB
            }
        }else{
            return message.ERRO_CONTENT_TYPE
        }
    }catch(error){
        console.error('Error ao iserir um novo lanche', error)
        return message.ERRO_INTERNAL_SERVER_DB
    }
}

const setAtualizarLanche = async function(dadosLanche, contentType, id){

    try{
        if(String(contentType).toLowerCase() == 'application/json'){
            
            let resultDadosLache = {}

            if(id === '' || id === undefined ||
            dadosLanche.nome === '' || dadosLanche.nome === undefined || dadosLanche.nome.length > 200||
            dadosLanche.preco === '' || dadosLanche.preco === undefined || dadosLanche.preco.length > 100
            
            ){
                return message.ERROR_REQUIERED_FIELDS
            }

            let atualiLanche = await lancheDAO.updateLanche(dadosLanche, id)

            dadosLanche.id = id

            if(atualiLanche){
                resultDadosLache.status = message.SUCESS_CREATED_ITEM.status
                resultDadosLache.status_code = message.SUCESS_CREATED_ITEM.status_code
                resultDadosLache.ERROR_message = message.SUCESS_CREATED_ITEM.message
                resultDadosLache.lanche = dadosLanche

                return resultDadosLache
            }else{
                return message.ERRO_INTERNAL_SERVER_DB
            }

        }else{
            return message.ERROR_REQUIERED_FIELDS
        }
    }catch(error){
        message.ERRO_INTERNAL_SERVER
    }
}

const setExcluirLanche = async function(id){

    try{
        let idLanche = id 

        let validacaoLancher = await getBuscarLanche(idLanche)

        if(idLanche == '' || idLanche == undefined || isNaN(idLanche)){
            return message.ERROR_INVALID_ID
        }else if(validacaoLancher.status == false){
            return message.ERROR_NOT_FOUND
        }else{
            let resulDados = await lancheDAO.deletarLanche(idLanche)

            if(resulDados){
                return message.SUCESS_DELETED_ITEM
            }else{
                return message.ERRO_INTERNAL_SERVER_DB
            }
        }
    }catch(error){
        message.ERRO_INTERNAL_SERVER
    }
}




module.exports = {
    getListarLanches,
    getBuscarLanche,
    setInserirNovoLanche,
    setAtualizarLanche,
    setExcluirLanche
}
const bebidaDAO = require('../model/DAO/bebida.js')
const message = require('../modulo/config.js')

const getListarBebida = async function(){

    let bebidaJSON = {}

    let dadosBebidas = await bebidaDAO.selectAllbebidas()

    if(dadosBebidas){
        bebidaJSON.bebida = dadosBebidas
        bebidaJSON.quantidade = dadosBebidas.length
        bebidaJSON.status_code = 200

        return bebidaJSON
    }else{
        return false
    }

}

const getBuscarBebida = async function(id){

    let idBebida = id

    let bebidaJSON = {}

    if(idBebida ==  '' || idBebida == undefined || isNaN(idBebida)){
        return message.ERROR_INVALID_ID
    }else{
        let dadosBebidas = await bebidaDAO.selectByIdSuco(idBebida)

        if(dadosBebidas){
            if(dadosBebidas.length > 0){
                bebidaJSON.bebida = dadosBebidas
                bebidaJSON.status_code = 200

                return bebidaJSON
            }else
            return message.ERROR_NOT_FOUND
        }else{
            return message.ERRO_INTERNAL_SERVER_DB
        }
    }
}

const setInserirNovaBebida = async function(dadosbebida, contentType) {

    try{
        if(String(contentType).toLowerCase() === 'application/json') {
            
            let novaBebidaJSON = {}

            if(dadosbebida.nome === '' || dadosbebida.nome === undefined || dadosbebida.nome === null || dadosbebida.nome.length > 200 ||
            dadosbebida.preco === '' || dadosbebida.preco === undefined || dadosbebida.preco === null || dadosbebida.preco.length > 100 
            ){
                return message.ERROR_REQUIERED_FIELDS
            }

            let novaBebida = await bebidaDAO.insertBebida(dadosbebida)

            if(novaBebida) {
                novaBebidaJSON.bebida = dadosbebida,
                novaBebidaJSON.status = message.SUCESS_CREATED_ITEM.status,
                novaBebidaJSON.status_code = message.SUCESS_CREATED_ITEM.status_code,
                novaBebidaJSON.message = message.SUCESS_CREATED_ITEM.message

                return novaBebidaJSON
            }else{
                return message.ERRO_INTERNAL_SERVER_DB
            }
        }else{
            return message.ERRO_INTERNAL_SERVER_DB
        }
    }catch(error) {
        return message.ERRO_INTERNAL_SERVER_DB
    }
}

const setAtualizarBebida = async function(dadosbebida, contentType, id){

    try {
        if(String(contentType).toLowerCase() == 'application/json'){

            let resulDadosBebida = {}

            if(id === '' || id === undefined ||
            dadosbebida.nome === '' || dadosbebida.nome === undefined || dadosbebida.nome.length > 200 ||
            dadosbebida.preco === '' || dadosbebida.preco === undefined || dadosbebida.preco.length > 100
            
            ){

           return message.ERROR_REQUIERED_FIELDS

            }

            let atualizaBebida = await bebidaDAO.updateBebida(dadosbebida, id)

            dadosbebida.id = id

            if(atualizaBebida){
                resulDadosBebida.status = message.SUCESS_CREATED_ITEM.status
                resulDadosBebida.status_code = message.SUCESS_CREATED_ITEM.status_code
                resulDadosBebida.ERROR_message = message.SUCESS_CREATED_ITEM.message
                resulDadosBebida.bebida = dadosbebida

                return resulDadosBebida
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

const setExcluirBebida = async function(id){

    try{
        let idBebida = id

        let validacaobebida = await getBuscarBebida(idBebida)

        if(idBebida == '' || idBebida == undefined || isNaN(idBebida)){
            return message.ERROR_INVALID_ID
        }else if(validacaobebida.status == false){
            return message.ERROR_NOT_FOUND
        }else{

            let resulDados = await bebidaDAO.deletarBebida(idBebida)

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
    getListarBebida,
    getBuscarBebida,
    setInserirNovaBebida,
    setAtualizarBebida,
    setExcluirBebida
}
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

const selectAllbebidas = async function(){
     let sql = 'select * from tbl_bebida'

     let rsBebida = await prisma.$queryRawUnsafe(sql)

     if(rsBebida.length > 0)
           return rsBebida
    else (error)
           return false
}

const selectByIdSuco = async function(id){
    try{
        let  sql = `select * from tbl_bebida where id = ${id}`

        let rsBebida = await prisma.$queryRawUnsafe(sql)

        return rsBebida
    }catch(error){
        return false
    }
}

const insertBebida = async function(dadosbebida){

    try{
        let sql

        if(dadosbebida){
            sql = `insert into tbl_bebida(
                      nome,
                      preco
                      
                      ) value(
                        '${dadosbebida.nome}',
                        '${dadosbebida.preco}'
                      )`
        }

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    }catch(erro){
        console.log(erro)
        return false
    }
}

const updateBebida = async function(dadosbebida, id){
    try {
         let sql 

         if(dadosbebida) {
            sql = `update tbl_bebida set 
                       nome = '${dadosbebida.nome}',
                       preco = '${dadosbebida.preco}'
                       where id = ${id}
                   `
         }

         let resultStatus = await prisma.$executeRawUnsafe(sql)

         if(resultStatus){
            return true
         }else {
            return false
         }
    }catch(error){
        return false
    }
}

const deletarBebida = async function(id){

    try{
        let sql = `delete from tbl_bebida where id = ${id}`

        let rsBebida = await prisma.$executeRawUnsafe(sql)

        return rsBebida
    }catch(error){
        return false
    }
}


module.exports = { 
    selectAllbebidas,
    selectByIdSuco,
    insertBebida,
    updateBebida,
    deletarBebida
}
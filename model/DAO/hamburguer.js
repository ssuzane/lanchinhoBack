const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();


const selectAllHamburguers = async function(){

    let sql = 'select * from tbl_hamburguer'

    let rsHamburguer = await prisma.$queryRawUnsafe(sql)

    if(rsHamburguer.length > 0)
        return rsHamburguer
    else (error)
        return false
}

const selectByIdHamburgues = async function(id){

    try{
        let sql = `select * from tbl_hamburguer where id = ${id}`

        let rsHamburguer = await prisma.$queryRawUnsafe(sql)

        return rsHamburguer
    }catch(error){
        return false
    }
}

const insertHamburguer = async function(dadosHamburguer){
    try{
        let sql 

        if(dadosHamburguer){
            sql = `insert into tbl_hamburguer (
            nome,
            preco
            ) value(
            
            '${dadosHamburguer.nome}',
            '${dadosHamburguer.preco}'
            )`
        }

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
           return false
    }catch(erro){
        return false
    }
}

const upadateHamburguer = async function (dadosHamburguer,id){

    try {
        
        let sql

        if(dadosHamburguer) {
            sql = `update tbl_hamburguer set
                        nome = '${dadosHamburguer.nome}',
                        preco = '${dadosHamburguer.preco}'
                        where id = ${id}`
        }

        let resultStatus = await prisma.$executeRawUnsafe(sql)

         if(resultStatus){
             return true
         } else {
             return false
         }
    }catch(error){
        console.error(error)
        return false
    }

}

const deleteHamburguer = async function(id){
    try{
        let sql = `delete from tbl_hamburguer where id = ${id}`

        let rsHamburguer = await prisma.$executeRawUnsafe(sql)

        return rsHamburguer
    }catch(error){
        return false
    }
}


module.exports = {
    selectAllHamburguers,
    selectByIdHamburgues,
    insertHamburguer,
    upadateHamburguer,
    deleteHamburguer
}
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

const selectAllLanches = async function(){

    let sql = 'select * from tbl_lanche'

    let rsLanche = await prisma.$queryRawUnsafe(sql)

    if(rsLanche.length > 0 )
        return rsLanche
    else(error)
        return false
}

const selectByIdLanche = async function(id){

    try{
        let sql = `select * from tbl_lanche where id = ${id}`

        let rsLanche = await prisma.$queryRawUnsafe(sql)

        return rsLanche
    }catch(error){
        return false
    }

}

const insertLanche = async function(dadosLanche){

    try{
        let sql

        if(dadosLanche) {
            sql = `insert into tbl_lanche(
                     nome,
                     preco
                     ) value(

                        '${dadosLanche.nome}',
                        '${dadosLanche.preco}'

                     )`
        }
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
          return true
        else
          return false
    }catch(error){
        return false
    }
}

const updateLanche = async function(dadosLanche, id){

    try{
        let sql

        if(dadosLanche){
            sql = `update tbl_lanche set 
                      nome = '${dadosLanche.nome}',
                      preco = '${dadosLanche.preco}'
                      where id = ${id}
                   `
        }

        let resultStatus = await prisma.$executeRawUnsafe(sql)

        if(resultStatus){
            return true
        }else{
            return false
        }
    }catch(error){
        console.error(error)
        return false
    }
}

const deletarLanche = async function(id){

    try{
        let sql = `delete from tbl_lanche where id = ${id}`

        let rsLanche = await prisma.$executeRawUnsafe(sql)

        return rsLanche
    }catch(error){
        
        return false
    }
}



module.exports = {
    selectAllLanches,
    selectByIdLanche,
    insertLanche,
    updateLanche,
    deletarLanche
}
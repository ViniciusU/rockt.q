const Database = require('../db/config')

module.exports = {


   async index(req, res){
        const db = await Database()
        const roomId = req.params.rom;
        const questionId = req.params.action;
        const password = req.body.password
        const action = req.params.action
        /* Verificar se a senha está correta */
       const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
       if(verifyRoom === password){
           if(action == "delete"){
               await db.run(`DELETE FROM questions WHERE id =${questionId}`)

           }else if(action == "check"){

            await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)

        }
        
    }else{
    res.redirect(`/rom/${roomId}`)}

       


    },
    async create(req, res){

        const db = await Database()

        const question = req.body.question
        const roomId = req.params.rom
        await db.run(`INSERT INTO questions(
            title,
            room,
            read
        )VALUES(
            "${question}",
            ${roomId},
            0
        )`)

        res.redirect(`/rom/${roomId}`)

       



    }
}
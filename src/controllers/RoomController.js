const Database = require("../db/config")

module.exports = {
    async create(req, res){
        const db = await Database()
        const pass = req.body.password

        let roomId;
        let isRoom = true

        while (isRoom) {
            //gera o numero da sala
            for(var i =0; i<6;i++){
                i == 0? roomId = Math.floor(Math.random()*10).toString() :roomId += Math.floor(Math.random()*10).toString()
    
            }
            
        
        
        //verifica se esse numero já existe
        const roomsExistIds = await db.all(`SELECT id FROM rooms`)
        isRoom =   roomsExistIds.some(roomsExistIds => roomsExistIds === roomId )
       

        if(! isRoom){

             //Inseri a sala no banco
            await db.run(`INSERT INTO rooms (
                id,
                pass
            ) VALUES (
                ${parseInt(roomId)},
                ${pass}
            )`)

        }
    }

    await db.close()
        

        
        res.redirect(`/rom/${roomId}`)
    },

   async open(req, res){
        const db = await Database()
        const roomId = req.params.rom
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read =1`)
        let isNoQuestions

        if(questions.length == 0){
            if(questionsRead ==0){

                isNoQuestions = true
            }
        }
        res.render("rom", {roomId: roomId, questions:questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})
    },
    enter(req, res){
        const roomId = req.body.roomId
        res.redirect(`/rom/${roomId}`)
    }


}
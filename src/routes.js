const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

const route = express.Router()
route.get('/', (req, res) => res.render("index",{page:'enter-room'}))
route.get('/create-pass', (req, res) => res.render("index",{page:'create-pass'}))

route.post('/create-room', RoomController.create)
route.get('/rom/:rom',RoomController.open)
route.post('/enterroom', RoomController.enter)

//questions
route.post('/question/create/:rom', QuestionController.create)
route.post('/question/:rom/:question/:action',QuestionController.index)











module.exports = route;
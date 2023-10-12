//import { openDb } from './configDB.js';
//import { createTable, insertClass, updateClass, selectClass, selectClassbyId, deleteClassbyId } from './Controler/Class.js';

import express from 'express';
import router from './routes.js';
import cors from 'cors'
import { createTableClass, createTableRegistro, createTableStudents, createTableTurma, createTableUsers } from './Controler/Class.js';
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())

//////////////TABELAS ABAIXOOOOO V V V V V V V V V 

//TABELA usuarios
createTableUsers();

//TABELA classes
createTableClass();

//TABELA turmas
createTableTurma();

//TABLEA alunos
createTableStudents();

//TABELA registros
createTableRegistro();

app.use(router);
//app.get('/', (req, res) => {
//  res.send('Hello World!')
//})
//
//app.get('/rooms', async (req, res) => {
//  let Turma = await selectClass();
//  res.json(Turma);
//})

//app.get('/room', async (req, res) => {
//  let Turma = await selectClassbyId(req.body.id);
//  res.json(Turma);
//})

//app.post('/room', (req, res) => {
//    insertClass(req.body);
//    res.json({
//        "statucCode":200
//    })
//});

//app.put('/room', (req, res) => {
//  if(req.body && !req.body.id){
//    res.json({
//        "statusCode":"400",
//        "msg":"Voce precisa informar um ID"
//    })
//  }else{
//    updateClass(req.body);
//    res.json({
//        "statucCode":200
//    })
//  }
//});

//app.delete('/room', async (req, res) => {
//   let Turma = await deleteClassbyId(req.body.id);
//    res.json(Turma);
//})


app.listen(port, () => {
  console.log(`Api rodando na porta: ${port}`)
})

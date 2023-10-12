//import { openDb } from './configDB.js';
//import { createTable, insertClass, updateClass, selectClass, selectClassbyId, deleteClassbyId } from './Controler/Class.js';

import express from 'express';
const app = express();
const port = 3000;


app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

import router from './routes.js';


//////////////TABELAS ABAIXOOOOO V V V V V V V V V 

//TABELA usuarios
createTableUsers();
import { createTableUsers } from './Controler/Class.js';
app.use(router);

//TABELA classes
createTableClass();
import { createTableClass } from './Controler/Class.js';
app.use(router);

//TABELA turmas
createTableTurma();
import { createTableTurma } from './Controler/Class.js';
app.use(router);

//TABLEA alunos
createTableStudents();
import { createTableStudents } from './Controler/Class.js';
app.use(router);

//TABELA registros
createTableRegistro();
import { createTableRegistro } from './Controler/Class.js';
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

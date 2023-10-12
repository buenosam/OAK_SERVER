import { Router } from "express";
import { selectUser, selectUserbyId, insertUser, updateUser, deleteUserbyId, insertClass, updateClass, selectClass, selectClassbyId, deleteClassbyId, selectStudent, selectStudentbyId, insertStudent, updateStudent, deleteStudentbyId, createTableStudents, createTableRegistro, selectRegister, selectRegisterbyId, insertRegister, updateRegister, deleteRegisterbyId, selectTurma, selectTurmabyId, insertTurma, updateTurma, deleteTurmabyId } from './Controler/Class.js';

const router = Router();

router.get('/', (req, res)=>{
    res.json({
        "statusCode":200,
        "msg": "Api Rodando"
    })
})
//usuarios
router.get('/users', selectUser);
router.get('/user', selectUserbyId);
router.post('/user', insertUser);
router.put('/user', updateUser);
router.delete('/user', deleteUserbyId);
//salas
router.get('/classes_', selectClass);
router.get('/classes', selectClassbyId);
router.post('/classes', insertClass);
router.put('/classes', updateClass);
router.delete('/classes', deleteClassbyId);
//turma
router.get('/rooms', selectTurma);
router.get('/room', selectTurmabyId);
router.post('/room', insertTurma);
router.put('/room', updateTurma);
router.delete('/room', deleteTurmabyId);
//aluno
router.get('/students', selectStudent);
router.get('/student', selectStudentbyId);
router.post('/student', insertStudent);
router.put('/student', updateStudent);
router.delete('/student', deleteStudentbyId);
//registro
router.get('/registers', selectRegister);
router.get('/register', selectRegisterbyId);
router.post('/register', insertRegister);
router.put('/register', updateRegister);
router.delete('/register', deleteRegisterbyId);





export default router;
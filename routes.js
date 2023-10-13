import { Router } from "express";
import { selectUser, selectUserbyId, insertUser, updateUser, deleteUserbyId, insertClass, updateClass, selectClass, selectClassbyId, deleteClassbyId, selectStudent, selectStudentbyId, insertStudent, updateStudent, deleteStudentbyId, createTableStudents, createTableRegistro, selectRegister, selectRegisterbyId, insertRegister, updateRegister, deleteRegisterbyId, selectTurma, selectTurmabyId, insertTurma, updateTurma, deleteTurmabyId, selectLogin, selectStudentbyRm, selectLoginAluno, insertStudentWithUser } from './Controler/Class.js';

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
//login
router.get('/login', selectLogin);
router.get('/login/aluno', selectLoginAluno);
//salas
router.get('/classes_groups', selectClass);
router.get('/classes', selectClassbyId);
router.post('/classes', insertClass);
router.put('/classes', updateClass);
router.delete('/classes', deleteClassbyId);
//turma
router.get('/class_groups', selectTurma);
router.get('/class_group', selectTurmabyId);
router.post('/class_group', insertTurma);
router.put('/class_group', updateTurma);
router.delete('/class_group', deleteTurmabyId);
//aluno
router.get('/students', selectStudent);
router.get('/student/id', selectStudentbyId);
router.get('/student/rm', selectStudentbyRm);
router.post('/student', insertStudent);
router.post('/student/new', insertStudentWithUser);
router.put('/student', updateStudent);
router.delete('/student', deleteStudentbyId);
//registro
router.get('/registers', selectRegister);
router.get('/register', selectRegisterbyId);
router.post('/register', insertRegister);
router.put('/register', updateRegister);
router.delete('/register', deleteRegisterbyId);
//login
/* router.post('/login', insertLogin); */

//


export default router;
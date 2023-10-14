import { openDb } from "../configDB.js";

///////////////////////////////////////////////////turmas ABAIXOOOO V V V V V V

export async function createTableUsers() {
  openDb().then((db) => {
    db.exec(`CREATE TABLE
        IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY,
            nome_usuario TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL,
            tipo_usuario TEXT CHECK(
                tipo_usuario IN ('aluno', 'admin')
            ) NOT NULL
        );`);
  });
}

export async function selectUser(req, res) {
  openDb().then((db) => {
    db.all("SELECT * FROM usuarios").then((users) => res.json(users));
  });
}
export async function selectUserbyId(req, res) {
  let id = req.query.id;
  openDb().then((db) => {
    db.get("SELECT * FROM usuarios WHERE id=?", [id]).then((user) =>
      res.json(user)
    );
  });
}

export async function insertUser(req, res) {
  let usuario = req.body;
  openDb().then((db) => {
    db.run(
      "INSERT INTO usuarios (nome_usuario, senha, tipo_usuario) VALUES (?,?,?)",
      [usuario.nome_usuario, usuario.senha, usuario.tipo_usuario]
    )
      .then((e) => {
        res.status(200);
        res.json({ msg: "Usuário criado com sucesso" });
      })
      .catch((error) => {
        res.status(409);
        res.json({ msg: "Usuário já existe" });
      });
  });
}

export async function updateUser(req, res) {
  let usuarios = req.body;
  openDb().then((db) => {
    db.run(
      "UPDATE usuarios SET nome_usuario=?, senha=?, tipo_usuario=? WHERE id=?",
      [
        usuarios.nome_usuario,
        usuarios.senha,
        usuarios.tipo_usuario,
        usuarios.id,
      ]
    ).then((usuario) => {
      res.status(200);
      res.json({ msg: "Usuario atualizado com sucesso" });
    });
  });
}

export async function deleteUserbyId(req, res) {
  let id = req.body.id;
  openDb().then((db) => {
    db.get("DELETE FROM usuarios WHERE id=?", [id]).then((user) =>
      res.json(user)
    );
  });
}

///////////////////////////////////////////////////salas ABAIXOOOO V V V V V V

export async function createTableClass() {
  openDb().then((db) => {
    db.exec(`CREATE TABLE IF NOT EXISTS salas (
            id INTEGER PRIMARY KEY,
            numero_sala INT NOT NULL,
            capacidade INT,
            tipo_sala TEXT CHECK(tipo_sala IN ('sala_de_aula', 'laboratorio', 'biblioteca', 'auditorio')) NOT NULL,
            andar_sala INT NOT NULL,
            UNIQUE (numero_sala,  andar_sala)
        );`);
  });
}

export async function selectClass(req, res) {
  openDb().then((db) => {
    db.all("SELECT * FROM salas").then((classes_groups) =>
      res.json(classes_groups)
    );
  });
}
export async function selectClassbyId(req, res) {
  let id = req.query.id;
  openDb().then((db) => {
    db.get("SELECT * FROM salas WHERE id=?", [id]).then((classes) =>
      res.json(classes)
    );
  });
}

export async function insertClass(req, res) {
  let sala = req.body;
  openDb().then((db) => {
    db.run(
      "INSERT INTO salas (numero_sala, capacidade, tipo_sala, andar_sala) VALUES (?,?,?,?)",
      [sala.numero_sala, sala.capacidade, sala.tipo_sala, sala.andar_sala]
    )
      .then((salas) => {
        res.status(200);
        res.json({ msg: "Sala inserida com sucesso" });
      })
      .catch((error) => {
        res.status(409);
        res.json({
          msg: `Já existe a sala ${salas.numero_sala} no andar ${salas.andar_sala}`,
        });
      });
  });
}

export async function updateClass(req, res) {
  let salas = req.body;
  openDb().then((db) => {
    db.run(
      "UPDATE salas SET numero_sala=?, capacidade=?, tipo_sala=?, andar_sala=? WHERE id=?",
      [
        salas.numero_sala,
        salas.capacidade,
        salas.tipo_sala,
        salas.andar_sala,
        salas.id,
      ]
    )
      .then((turma) => {
        res.status(200);
        res.json({ msg: "Sala atualizada com sucesso" });
      })
      .catch((error) => {
        res.status();
        res.json({ msg: "Não foi possivel atualizar a sala" });
      });
  });
}

export async function deleteClassbyId(req, res) {
  let id = req.body.id;
  openDb().then((db) => {
    db.get("DELETE FROM salas WHERE id=?", [id])
      .then((classes) => {
        res.status(200);
        res.json({ msg: "Sala deletada com sucesso" });
      })
      .catch((error) => {
        res.status();
        res.json({ msg: "Não foi possivel deletar a sala" });
      });
  });
}

///////////////////////////////////////////////////turmas ABAIXOOOO V V V V V V

export async function createTableTurma() {
  openDb().then((db) => {
    db.exec(`CREATE TABLE
        IF NOT EXISTS turmas (
            id INTEGER PRIMARY KEY,
            nome_turma TEXT NOT NULL,
            periodo TEXT CHECK (
                periodo IN (
                    'matutino',
                    'vespertino',
                    'noturno'
                )
            ) NOT NULL,
            sala_id INT,
            ano_letivo INT,
            UNIQUE (periodo, sala_id, ano_letivo)
            FOREIGN KEY (sala_id) REFERENCES salas(id)
        );`);
  });
}

export async function selectTurma(req, res) {
  openDb().then((db) => {
    db.all("SELECT * FROM turmas ORDER BY nome_turma ASC").then(
      (class_groups) => {
        res.json(class_groups);
      }
    );
  });
}
export async function selectTurmabyId(req, res) {
  let id = req.query.id;
  openDb().then((db) => {
    db.get("SELECT * FROM turmas WHERE id=?", [id]).then((class_group) =>
      res.json(class_group)
    );
  });
}

export async function insertTurma(req, res) {
  let turmas = req.body;
  openDb().then((db) => {
    db.run(
      "INSERT INTO turmas (nome_turma, ano_letivo, periodo, sala_id ) VALUES (?,?,?,?)",
      [turmas.nome_turma, turmas.ano_letivo, turmas.periodo, turmas.sala_id]
    )
      .then((turma) => {
        res.status(200);
        res.json({ msg: "Turma criada com sucesso" });
      })
      .catch((error) => {
        res.status(409);
        res.json({ msg: "Já existe uma turma com esses parâmetros" });
      });
  });
}

export async function updateTurma(req, res) {
  let turmas = req.body;
  openDb().then((db) => {
    db.run(
      "UPDATE turmas SET nome_turma=?, ano_letivo=?, periodo=?, sala_id=? WHERE id=?",
      [
        turmas.nome_turma,
        turmas.ano_letivo,
        turmas.periodo,
        turmas.sala_id,
        turmas.id,
      ]
    )
      .then((turma) => {
        res.status(200);
        res.json({ msg: "Turma atualizada com sucesso" });
      })
      .catch((error) => {
        res.status(409);
        res.json({ msg: "Não foi possível atualizar a turma" });
      });
  });
}

export async function deleteTurmabyId(req, res) {
  let id = req.body.id;
  openDb().then((db) => {
    db.get("DELETE FROM turmas WHERE id=?", [id]).then((class_group) =>
      res.json(class_group)
    );
  });
}

///////////////////////////////////////////////////ALUNO ABAIXOOOO V V V V V V

export async function createTableStudents() {
  openDb().then((db) => {
    db.exec(`CREATE TABLE IF NOT EXISTS alunos (
            id INTEGER PRIMARY KEY,
            rm INT UNIQUE,
            nome VARCHAR(48) NOT NULL,
            turma_id INT NOT NULL,
            rg VARCHAR(9) NOT NULL UNIQUE,
            cpf VARCHAR(11) NOT NULL UNIQUE,
            telefone VARCHAR(16),
            endereco VARCHAR(128),
            email VARCHAR(100) NOT NULL UNIQUE,
            status BIT NOT NULL,
            usuario_id INT,
            FOREIGN KEY (turma_id) REFERENCES turmas(id),
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        );`);
  });
}

export async function selectStudent(req, res) {
  openDb().then((db) => {
    const turma_id = req.query.turma_id;
    db.all("SELECT * FROM alunos WHERE turma_id = ?", [turma_id]).then(
      (students) => res.json(students)
    );
  });
}

export async function selectStudentbyId(req, res) {
  let id = req.query.id;
  openDb().then((db) => {
    db.get("SELECT * FROM alunos WHERE id=?", [id]).then((student) => {
      res.json(student);
    });
  });
}

export async function selectStudentbyRm(req, res) {
  let rm = req.query.rm;
  openDb().then((db) => {
    db.get("SELECT * FROM alunos WHERE rm=?", [rm]).then((student) => {
      res.json(student);
    });
  });
}

export async function insertStudent(req, res) {
  let alunos = req.body;
  openDb().then((db) => {
    db.run(
      "INSERT INTO alunos (rm, nome, turma_id, rg, cpf, telefone, endereco, email, status, usuario_id) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        alunos.rm,
        alunos.nome,
        alunos.turma_id,
        ,
        alunos.cpf,
        alunos.telefone,
        alunos.endereco,
        alunos.email,
        alunos.status,
        alunos.usuario_id,
      ]
    )
      .then((banco) => {
        res.status(200);
        res.json({ msg: "Aluno criado com sucesso!" });
      })
      .catch((error) => {
        res.status(409);
        res.json({ msg: "Não foi possível criar o aluno" });
      });
  });
}

export async function insertStudentWithUser(req, res) {
  const alunos = req.body;
  const db = await openDb();

  try {
    await db.run("BEGIN TRANSACTION");
    // Inserir o aluno
    const alunoResult = await db.run(
      "INSERT INTO alunos (rm, nome, turma_id, rg, cpf, telefone, endereco, email, status, usuario_id) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [alunos.rm,alunos.nome,alunos.turma_id,alunos.rg,alunos.cpf,alunos.telefone,alunos.endereco,alunos.email,alunos.status,alunos.usuario_id,]
    );
    // Inserir o usuário
    const usuarioResult = await db.run(
      "INSERT INTO usuarios (nome_usuario, senha, tipo_usuario) VALUES (?,?,?)",
      [alunos.email, alunos.cpf, "aluno"]
    );
    // Atualizar o campo "usuario_id" no registro do aluno
    await db.run("UPDATE alunos SET usuario_id=? WHERE id=?", [
      usuarioResult.lastID,
      alunoResult.lastID,
    ]);
    await db.run("COMMIT");
    res.status(200);
    res.json({ msg: "Sucesso!" });
  } catch (error) {
    console.log(error)
    await db.run("ROLLBACK");
    res.status(409);
    res.json({ msg: "Não foi possível realizar a ação", error });
  } finally {
    db.close();
  }
}

export async function updateStudent(req, res) {
  let alunos = req.body;
  openDb().then((db) => {
    db.run(
      "UPDATE alunos SET rm=?, nome=?, turma_id=?, rg=?, cpf=?, telefone=?, endereco=?, email=?, status=?, usuario_id=? WHERE id=?",
      [alunos.rm,alunos.nome,alunos.turma_id,alunos.rg,alunos.cpf,alunos.telefone,alunos.endereco,alunos.email,alunos.status,alunos.usuario_id,alunos.id]
    ).then((student) => {
      res.status(200);
      res.json({ msg: "Sucesso!" });
    }).catch(() => {
        res.status(409);
        res.json({ msg: "Já existe um aluno cadastrado com esses parâmetros" });
    })
  });
}

export async function deleteStudentbyId(req, res) {
  let id = req.body.id;
  openDb().then((db) => {
    db.get(`SELECT * FROM alunos WHERE alunos.id = ${id}`)
      .then((aluno) => {
        if (aluno) {
          db.run("DELETE FROM alunos WHERE id=?", [id]).then((student) => {
            res.status(200);
            res.json({ msg: "Sucesso!" });
          });
        } else {
          res.status(404);
          res.json({ msg: "Aluno inexistente!" });
        }
      })
      .catch((error) => {
        res.status(500);
        res.json({ msg: "SERVIDOR MORREU FAMILIA" });
      });
  });
}

///////////////////////////////////////////////////REGISTRO ABAIXOOOO V V V V V V

export async function createTableRegistro() {
  openDb().then((db) => {
    db.exec(`CREATE TABLE IF NOT EXISTS registros (
            id INTEGER PRIMARY KEY,
            aluno_id INT,
            horario DATETIME,
            entrada_saida TEXT CHECK(entrada_saida IN ('entrada', 'saida')) NOT NULL,
            status TEXT CHECK(status IN ('autorizado', 'negado')) NOT NULL,
            justificativa TEXT,
            FOREIGN KEY (aluno_id) REFERENCES alunos(id)
        );`);
  });
}

export async function selectRegister(req, res) {
  openDb().then((db) => {
    db.all("SELECT * FROM registros").then((registers) => res.json(registers));
  });
}
export async function selectRegisterbyId(req, res) {
  let id = req.query.id;
  openDb().then((db) => {
    db.get("SELECT * FROM registros WHERE id=?", [id]).then((register) =>
      res.json(register)
    );
  });
}

export async function insertRegister(req, res) {
  let registros = req.body;
  openDb().then((db) => {
    db.run(
      "INSERT INTO registros (aluno_id, horario, entrada_saida, status, justificativa) VALUES (?,?,?,?,?)",
      [
        registros.aluno_id,
        registros.horario,
        registros.entrada_saida,
        registros.status,
        registros.justificativa,
      ]
    ).then((register) => {
      res.status(200);
      res.json({ msg: "Registro inserido com sucesso!" });
    });
  });
}

export async function updateRegister(req, res) {
  let registros = req.body;
  openDb().then((db) => {
    db.run(
      "UPDATE registros SET aluno_id=?, horario=?, entrada_saida=?, status=?, justificativa=? WHERE id=?",
      [
        registros.aluno_id,
        registros.horario,
        registros.entrada_saida,
        registros.status,
        registros.justificativa,
        registros.id,
      ]
    ).then((register) => {
      res.status(200);
      res.json({ msg: "Registro atualizado com sucesso!" });
    });
  });
}

export async function deleteRegisterbyId(req, res) {
  let id = req.body.id;
  openDb().then((db) => {
    db.run("DELETE FROM registros WHERE id=?", [id])
      .then((banco) => {
        if (banco.changes <= 0) {
          res.status(404);
          res.json({ msg: "Não foi possível excluir esse registro" });
        } else {
          res.status(200);
          res.json({ msg: "Registro deletado com sucesso!" });
        }
      })
      .catch((error) => {
        res.status(500);
        res.json(error);
      });
  });
}

///////////////////////////////////////////////////LOGINS ABAIXOOOO V V V V V V

//export  async function insertLogin(req, res){
// let usuarios = req.body;
//openDb().then(db=>{
//    db.run('INSERT INTO usuarios (nome_usuario, senha, tipo_usuario) VALUES (?,?,?)', [usuarios.nome_usuario, usuarios.senha, usuarios.tipo_usuario])
//    .then(login=>  res.json(login));
// });
// res.json({
//    "statusCode":200
//})
//}

/* export  async function insertLogin(req, res){
    let usuarios = req.body;
    openDb().then(db=>{
        db.run('SELECT * FROM usuarios WHERE nome_usuario=? AND senha=?' , [usuarios.nome_usuario, usuarios.senha, usuarios.tipo_usuario])
        .then(login=>  {
            if(nome_usuario = !"", senha = !"", tipo_usuario = !"" ){
                db.run('INSERT INTO usuarios (nome_usuario, senha, tipo_usuario) VALUES (?,?,?)', [usuarios.nome_usuario, usuarios.senha, usuarios.tipo_usuario])
                res.status(200)
                res.json({usuario: login.nome_usuario, tipo_usuario: login.tipo_usuario})
            }else{
                res.status(403)
                res.json({mensagem: "Usuário já cadastrado."})
            }
        });
    }).catch(() => {
        res.json({statusCode: 502})
    });
} */

export async function selectLogin(req, res) {
  let usuario = req.query;

  openDb()
    .then((db) => {
      db.get("SELECT * FROM usuarios WHERE nome_usuario=? AND senha=?", [
        usuario.nome_usuario,
        usuario.senha,
      ]).then((login) => {
        if (login) {
          res.status(200);
          res.json({
            usuario: login.nome_usuario,
            tipo_usuario: login.tipo_usuario,
          });
        } else {
          res.status(403);
          res.json({ mensagem: "Usuário ou senha inválidos." });
        }
      });
    })
    .catch(() => {
      res.json({ statusCode: 502 });
    });
}

export async function selectLoginAluno(req, res) {
  let usuario = req.query;

  openDb()
    .then((db) => {
      db.get(
        `SELECT alunos.id, alunos.rm, alunos.nome, alunos.rg, alunos.cpf, alunos.telefone, alunos.endereco , alunos.email, alunos.status  
                FROM alunos 
                INNER JOIN usuarios ON alunos.usuario_id = usuarios.id 
                WHERE usuarios.nome_usuario = ? AND usuarios.senha = ?`,
        [usuario.nome_usuario, usuario.senha]
      ).then((login) => {
        if (login) {
          res.status(200);
          if ((login.status = 1)) {
            login.status = "Presente";
          } else login.status = "Ausente";
          res.json(login);
        } else {
          res.status(403);
          res.json({ mensagem: "Usuário ou senha inválidos." });
        }
      });
    })
    .catch(() => {
      res.json({ statusCode: 502 });
    });
}

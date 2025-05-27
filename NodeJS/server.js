import express from 'express';
import bodyParser from 'body-parser'
import cors from "cors"
import db from "@mmamorim/clapback"

const server = express();
server.use(bodyParser.json());       // suporte para JSON-encoded bodies
server.use(bodyParser.urlencoded({     // suporte para URL-encoded bodies
    extended: true
}));
server.use(cors())

const PORT = 3000

await db.init({ dbFileName: 'db.json' })
server.use("/clapback", db.serve(PORT))

server.get('/', (req, res) => {
    res.send('🙋‍♂️ Oi gentessssss...você acessou a raiz /');
});

server.get('/frutas', (req, res) => {
    let dados = db.get("/frutas")
    console.log("dados",dados);    
    res.json(dados);
});

server.get('/frutas/:id', (req, res) => {
    console.log("passei aqui",req.params.id);    
    let dados = db.get("/frutas/"+req.params.id)
    console.log("dados",dados);    
    res.json(dados);
});

server.post('/frutas/:id', (req, res) => {
    console.log("recebi uma requisição POST /frutas/:id",req.params.id);    
    console.log("chegou no body",req.body);    
    let elem = {
        id: req.params.id,
        nome: req.body.nome,
        cor: req.body.cor
    }
    console.log("elem",elem)
    db.set("/frutas/"+elem.id, elem)
    res.json({ msg: "ok", elem });
});

server.put('/frutas/:id', (req, res) => {
    console.log("recebi uma requisição PUT /frutas/:id",req.params.id);    
    console.log("chegou no body",req.body);    
    let elem = {
        id: req.params.id,
        nome: req.body.nome,
        cor: req.body.cor
    }
    console.log("elem",elem)
    db.set("/frutas/"+elem.id, elem)
    res.json({ msg: "ok", elem });
});

server.delete('/frutas/:id', (req, res) => {
    console.log("recebi uma requisição DELETE /frutas/:id",req.params.id);    
    db.set("/frutas/"+req.params.id, null)
    res.json({ msg: "ok. Removido com sucesso" });
});


server.post('/usuarios', (req, res) => {
    // Pega a lista atual de usuários ou cria uma nova se não existir
    let usuarios = db.get("/usuarios") || [];
    // Adiciona o novo usuário
    usuarios.push({
        nome: req.body.nome,
        cpf: req.body.cpf,
        email: req.body.email,
        senha: req.body.senha
    });
    // Salva de volta no db.json
    db.set("/usuarios", usuarios);
    res.json({ msg: "Usuário cadastrado com sucesso!" });
});

server.get('/usuarios', (req, res) => {
    let usuarios = db.get("/usuarios") || [];
    res.json(usuarios);
});

server.listen(PORT, () => {
    console.log('Server escutando na porta '+PORT);
});
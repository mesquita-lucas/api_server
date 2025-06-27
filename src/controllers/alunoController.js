import { alunos } from '../models/alunos.js';

export function getAll(req, res) {
    res.json(alunos);
}

export function getById(req, res) {
    const aluno = alunos.find(a => a.id == req.params.id);
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado!' });
    res.json(aluno);
}

export function create(req, res) {
    const { id, nome, ra, nota1, nota2 } = req.body;
    if (alunos.find(a => a.id == id)) {
        return res.status(400).json({ message: 'Aluno com esse ID já existe!' });
    }

    alunos.push({ id, nome, ra, nota1, nota2 });
    res.status(201).json({ message: 'Aluno criado com sucesso!' });
}

export function update(req, res) {
    const aluno = alunos.find(a => a.id == req.params.id);
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado!' });

    Object.assign(aluno, req.body);
    res.json({ message: 'Aluno atualizado com sucesso!' });
}

export function remove(req, res) {
    const index = alunos.findIndex(a => a.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Aluno não encontrado!' });

    alunos.splice(index, 1);
    res.json({ message: 'Aluno removido com sucesso!' });
}

export function getMedias(req, res) {
    const medias = alunos.map(a => ({
        nome: a.nome,
        media: (a.nota1 + a.nota2) / 2
    }));
    res.json(medias);
}

export function getAprovados(req, res) {
    const result = alunos.map(a => {
        const media = (a.nota1 + a.nota2) / 2;

        return {
            nome: a.nome,
            status: media >= 6 ? 'aprovado' : 'reprovado'
        };
    });

    res.json(result);
}
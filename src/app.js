import express from "express"

const app = express();
app.use(express.json());

function buscaLivro(id) {
    return livros.findIndex( livro => {
        return livro.id === Number(id);
    })
}

const livros = [
    {
        id: 1,
        titulo: "2001: Uma Odisseia no Espaço"
    },
    {
        id: 2,
        titulo: "O Hobbit"
    }
]

app.get("/", (req, res) => {
    res.status(200).send("Hello")
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
})

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).send("Livro cadastrado com sucesso.")
})

app.get("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);

    if (index === -1){
        return res.status(404).json( {message: "Livro não encontrado"} );
    }
    res.status(200).json( livros[index] );
})

app.put("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json( livros[index] );

})

app.delete("/livros/:id", (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice( index, 1 );
    res.status(200).json( { message: "Livro removido!" } );
    console.log(livros);
})

export default app;
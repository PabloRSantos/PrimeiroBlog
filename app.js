const express = require("express")
const app = express();
const handlebars = require("express-handlebars")
const body_parser = require ("body-parser")
const admin = require("./rotas/admin")
const mongoose = require("mongoose")
require("./models/Post")
const PostBd = mongoose.model("Post")
const sessao = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
require("./config/auth")(passport)
const usuario = require("./rotas/usuario")
require("./models/Comentario")
const ComentarioBd = mongoose.model("Comentario")
require("./models/Usuario")
const UsuarioBd = mongoose.model("usuarios")

app.use(sessao({
    secret: "blogfoto",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
//middleware
app.use((req, res, next) => {
res.locals.sucesso_msg = req.flash("sucesso_msg")
res.locals.erro_msg = req.flash("erro_msg")
res.locals.error = req.flash("error")
res.locals.user = req.user || null
next()
})

//--------------------MONGOOSE
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/blogFotografia", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conectado")
}).catch((err) => {
    console.log("Não conectado, erro: " + err)
})

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")
app.use(body_parser.urlencoded({extended:true}))
app.use(body_parser.json())
app.use(express.static('public'))

app.use("/admin", admin)
app.use("/usuarios", usuario)

app.get("/", function(req, res){
    PostBd.find().limit(10).sort({data: -1}).lean().then((postagens) => {
    res.render(__dirname + "/views/layouts/index", {
        style: "css/home.css",
        script: "home.js",
        postagens: postagens
    })
}).catch((err) => {
    console.log("Erro ao carregar postagens" + err)
})
})

app.get("/post:id", function(req, res) {
    
    PostBd.findById(req.params.id).lean().then((postagens) => {
        ComentarioBd.find({postagem: req.params.id}).lean().then((comentario) => {
        res.render(__dirname + "/views/layouts/postagem", {
            style: "css/postagem.css",
            postagens: postagens,
            comentario: comentario,
           
        })
    })
    }).catch((err) => {
        console.log("erro ao achar collection " + err)
    })
})

app.post("/comentario", function(req, res){
    ComentarioBd.find({usuario: req.body.idUser}).lean().then((comentario) => {
            comentario.conteudo = req.body.comentario
            comentario.postagem = req.body.idPost
            comentario.nome = req.body.nomeUser
            new ComentarioBd(comentario).save().then(() => {
                res.redirect("/")
            })
    }).catch((err) => {
        console.log(err)
    })
})


app.listen(8081, function(){
    console.log("Servidor rodando");
})
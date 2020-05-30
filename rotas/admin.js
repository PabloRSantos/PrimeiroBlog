const express = require("express")
const rota = express.Router()
const mongoose = require("mongoose")
require("../models/Post")
PostBd = mongoose.model("Post")
const {eAdmin} = require("../helpers/eAdmin")

rota.get("/", eAdmin, function(req, res){
    res.render("admin/homeAdmin", {
        style: "/css/admin/homeAdmin.css"
    })
})

rota.get("/addPost", eAdmin, function(req, res){
    res.render("admin/addPost", {
        style: "/css/admin/addPost.css"
    })
})

rota.post("/adicionouPost", eAdmin, function(req, res){
    const newPost = {
        titulo: req.body.titulo,
        imagem: req.body.imagem,
        descricao: req.body.descricao,
        introducao: req.body.introducao,
        desenvolvimento: req.body.desenvolvimento,
        conclusao: req.body.conclusao
    }

    new PostBd(newPost).save().then(() => {
        res.redirect("/admin")
    }).catch((err) => {
        res.redirect("/admin")
        console.log(err)
    })
})

rota.get("/removePost", eAdmin, function(req, res){
    PostBd.find().lean().then((postagens) => {
        res.render("admin/removePost", {
            style: "/css/admin/removePost.css",
            postagens: postagens
        })
    }).catch((err) => {
        console.log(err)
    })
    

})

rota.post("/removeuPost/:id", eAdmin, function(req, res){
PostBd.remove({_id: req.params.id}).then(() => {
    res.redirect("/admin")
    console.log("removido")
}).catch((err) => {
    res.redirect("/admin")
    console.log(err)
})
})

rota.get("/editPost", eAdmin, function(req,res){
    PostBd.find().lean().then((postagens) => {
        res.render("admin/editPost", {
            style: "/css/admin/editPost.css",
            postagens: postagens
        })
    })
})

rota.get("/formEdit:id", eAdmin, function(req,res){
    PostBd.findById(req.params.id).lean().then((postagens)=> {
        res.render("admin/formEdit", {
            style: "/css/admin/formEdit.css",
            postagens: postagens
        })
    }).catch((err) => {
        console.log("Erro ao achar collection2" + err)
        res.redirect("/admin")
    })
})

rota.post("/editouPost:id", eAdmin, function(req, res){
    PostBd.findById(req.params.id).then((postagens) => {
            postagens.titulo = req.body.titulo
            postagens.descricao = req.body.descricao
            postagens.introducao = req.body.introducao
            postagens.desenvolvimento = req.body.desenvolvimento
            postagens.conclusao = req.body.conclusao
            postagens.imagem = req.body.imagem
            postagens.save().then(() => {
                res.redirect("/admin")
                console.log("Editado com sucesso")
            }).catch((err) => {
                res.redirect("/admin")
                console.log("Erro ao editar" + err)
            })
       
    }).catch((err) => {
        res.redirect("/admin")
        console.log("Erro ao achar collection" + err)
    })
})

module.exports = rota
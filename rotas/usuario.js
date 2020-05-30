const express = require("express")
const mongoose = require("mongoose")
const rota = express.Router()
const passport = require("passport")
require("../models/Usuario")
const userDb = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")
require("../models/Comentario")
const comentDb = mongoose.model("Comentario")

rota.get("/cadastro", function(req,res) {
    res.render("usuarios/registro", {
        style: "/css/usuarios/cadastro.css"
    })
})

rota.post("/cadastro", function(req, res) {
    var erros = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({erroTxt: "Nome inválido"})
        }

    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({erroTxt: "Email inválido"})
        }

    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({erroTxt: "Senha inválida"})
        }

    if(req.body.senha.length < 4){
        erros.push({erroTxt: "Senha muito pequena"})
    }
    if (req.body.senha != req.body.senha2){
        erros.push({erroTxt: "As senhas são diferentes, tente novamente"})
    }

    if (erros.length > 0) {
        console.log("tente novamente")
    } else{
        userDb.findOne({email: req.body.email}).then((usuario) => {
            if(usuario){
                req.flash("sucesso_msg", "Email já existente")
            res.redirect("/cadastro")
            }else{
                const novoUsuario = new userDb ({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (err, hash) => {
                        if (err) {
                            req.flash("error_msg", "Houve um erro durante o salvamento do usuário");
                            res.redirect("/cadastro");
                        } else {
                            novoUsuario.senha = hash;
                            novoUsuario.save().then(() => {
                                req.flash("success_msg", "Usuário cadastrado com sucesso!");
                                res.redirect("/");
                            }).catch(() => {
                                req.flash("error_msg", "Houve um erro na criação do usuário");
                                res.redirect("/usuarios/registro");
                            });
                        }
                    });
                });
            }
        }).catch((err) => {
            req.flash("erro_msg", "Erro interno")
            res.redirect("/")
            console.log(err)
        })

    }
    
})

rota.get("/login", function(req,res){
    res.render("usuarios/login", {
        style: "/css/usuarios/login.css"
    })
})

rota.post("/login", function(req, res, next){
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/usuarios/login",
        failureFlash: true
    })(req, res, next)
})

rota.get("/logout", function(req, res){
    req.logout()
    req.flash("sucesso_msg", "Logout feito com sucesso")
    res.redirect("/")
})

module.exports = rota
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Comentario = new Schema ({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "usuarios"
    },
    nome: {
        type: String
    },
    conteudo: {
        type: String,
    },
    postagem: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    data: {
        type: Date,
        default: Date.now()
    }

})

mongoose.model("Comentario", Comentario)
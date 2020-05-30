const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Post = new Schema ({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
    },
    introducao: {
        type: String,
        required: true
    },
    desenvolvimento: {
        type: String,
        required: true
    },
    conclusao: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("Post", Post)
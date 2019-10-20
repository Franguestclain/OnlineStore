const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    path:{
        type: String,
        required: true,
        trim: true
    },
    originalName: {
        type: String,
        required: true
    }
});

const ItemSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    precio: {
        type: Number,
        required: true
    },
    oferta: {
        activada: {
            type: Boolean,
            default: false
        },
        valor: {
            type: Number
        }
    },
    imagenes: [imageSchema]
})


module.exports = Item = mongoose.model('item', ItemSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fecha_registro: {
        type: Date,
        default: Date.now
    }
});


module.exports = User = mongoose.model('user', UserSchema);
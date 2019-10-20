const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const app = express();
const db = config.get('mongoURI');

//Defino de manera 'global' el directorio donde se guardaran las imagenes
app.use('/uploads/', express.static(__dirname+'/uploads'));

app.use(express.json());

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: 'tienda'
})
.then(res => {
    console.log("Base de datos conectada...");
})
.catch(err => console.log(`Hubo un error con la conexion: ${err}`));



app.use('/api/items', require('./routes/api/items.js'));
app.use('/api/usuarios', require('./routes/api/usuarios.js'));
app.use('/api/auth', require('./routes/api/auth.js'));





const puerto = process.env.PORT || 5000;
app.listen(puerto, console.log(`Servidor iniciado en el puerto ${puerto}`));
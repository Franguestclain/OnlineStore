const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/Usuario');

// @route   POST api/usuarios/
// @desc    Registrar un nuevo usuario
// @access  Public
router.post('/', (req, res) => {
    const {nombre, email, password, password2} = req.body;

    // Validacion simple
    if(!nombre || !email || !password || !password2){
        return res.status(400).json({msg: "Por favor introduzca todos los campos"});
    }

    if(password !== password2) return res.status(400).json({msg: "Las contraseñas no coinciden"});

    User.findOne({email})
        .then(user => {
            if(user) return res.status(400).json({msg: "El usuario ya existe"});

            const newUser = new User({
                nombre,
                email,
                password
            });

            //Crear salt y hashear
            bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user=>{
                            if(user.admin){
                                jwt.sign(
                                    { id: user.id },
                                    config.get('jwtSecret'),
                                    { expiresIn: 3600 },
                                    (err, token) => {
                                        if(err) throw err;
                                        res.json({
                                            token,
                                            user: {
                                                id: user.id,
                                                nombre: user.nombre,
                                                email: user.email
                                            }
                                        });       
                                    }
                                );
                            }else{
                                //Mandamos el token vacio porque no es administrador
                                res.json({
                                    user
                                });
                            }
                        });
                });
            });
        });
});


module.exports = router;
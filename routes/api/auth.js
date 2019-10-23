const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/Usuario');

// @route   POST api/auth
// @desc    Autenticar usuario
// @access  Public
router.post('/', (req, res) => {
    const {email, password} = req.body;

    // Validacion simple
    if(!email || !password){
        return res.status(400).json({msg: "Por favor introduzca todos los campos"});
    }

    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({msg: "El usuario no existe"});

            // Validar password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({msg: "Credenciales incorrectas"});

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

                });
        });
});

// @route   Get api/auth/user
// @desc    Obtener los datos del usuario
// @access  Private
router.get('/user', auth, (req,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});


module.exports = router;
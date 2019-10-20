const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // Checar el token
    if(!token) res.status(401).json({msg: 'No token, autorizacion denegada'});

    try{
        // Verificar token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        
        // Añadir el usuario del payload
        req.user = decoded;
        next();   
    }catch(e){
        res.status(400).json({msg: `Token no es valido`});
    }
}

module.exports = auth;
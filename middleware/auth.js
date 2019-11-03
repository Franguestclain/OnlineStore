const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // Checar el token
    if(!token) return res.status(401).json({msg: 'No existe token de administrador'});

    try{
        // Verificar token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        
        // Añadir el usuario del payload
        req.user = decoded;
        next();   
    }catch(e){
        return res.status(400).json({msg: `Token no es valido`});
    }
}

module.exports = auth;
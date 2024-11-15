import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authenticateToken = (req, res, next) => {
    //Obtener wl jwt de la cabezera de autenticacion
    const authHeader = req.headers['Authorization'];
    console.log('authHeader: ', authHeader);

    const token = authHeader && authHeader.split(' ')[1];
    console.log('token: ', token);

    if (!token) return res.sendStatus(401);

    //Verificamos y decodificamos el token
    const secret = process.env.JWT_SECRET;
    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403);

        //si token e es valido
        console.log('user: ', user);

        req.user = user;
        next();
    });
};
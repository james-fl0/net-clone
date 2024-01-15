import { Router } from "express";
import { userManager } from "../../../db/db.js";
import jwt from 'jsonwebtoken'
export const loginRouter = Router()

loginRouter.post('/Login', async (req, res) => {
    try {
        const user = await userManager.login(req.body.email, req.body.password)
        const token =  jwt.sign(user, 'secret')
         req.session.token = token
         res.cookie('uth',token,{
            maxAge: 24 * 60 * 60 * 1000, // Tiempo de expiración en milisegundos (aquí configurado a 1 día)
            httpOnly: true, // La cookie solo es accesible a través de HTTP y no a través de JavaScript en el navegador
            secure: true, // Solo enviar la cookie en conexiones seguras (HTTPS) en producción
            sameSite: 'None', // Configurado a 'None' si necesitas enviar la cookie en solicitudes de navegadores de terceros
            domain: process.env.FRONTEND_URL || 'localhost', // Dominio al que pertenece la cookie
            path: '/Login', // Ruta a la que pertenece la cookie
        })
        res.status(201).json({ status: 'success', message: 'login ok' })
    } catch (error) {
        res.status(401).json({ status: 'error', message: error.message })
    }
}
)
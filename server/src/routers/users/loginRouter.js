import { Router } from "express";
import { userManager } from "../../../db/db.js";
import jwt from 'jsonwebtoken'
export const loginRouter = Router()

loginRouter.post('/Login', async (req, res) => {
    try {
        const user = await userManager.login(req.body.email, req.body.password)
        const token =  jwt.sign(user, 'secret')
         req.session.token = token
         res.cookie('uth','cacaaaaaa',{
            httpOnly: true,
            secure: false,
            sameSite: 'None', 
            domain: 'net-clone-xi.vercel.app', 
        })
        console.log(req.protocol)
        res.status(201).json({ status: 'success', message: 'login ok' })
    } catch (error) {
        res.status(401).json({ status: 'error', message: error.message })
    }
}
)
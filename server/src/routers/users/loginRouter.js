import { Router } from "express";
import { userManager } from "../../../db/db.js";
import jwt from 'jsonwebtoken'
export const loginRouter = Router()

loginRouter.post('/Login', async (req, res) => {
    try {
        const user = await userManager.login(req.body.email, req.body.password)
        const token =  jwt.sign(user, 'secret')
        req.session.token = token
        console.log(procces.env.NODE_ENV);
        res.status(201).json({ status: 'success', message: 'login ok' })
    } catch (error) {
        res.status(401).json({ status: 'error', message: error.message })
    }
}
)
import { Router } from "express";
import passport from "passport";

export const loginRouter = Router()

loginRouter.post('/Login', await passport.authenticate('loginLocal', { failWithError: true }),
    async (req, res, next) => {
        res.status(201).json({ status: 'success', message: 'login success', user: req.session.user })
    },
    (error, req, res, next) => {
        res.status(401).json({ status: 'success', message: error.message })
    }
)
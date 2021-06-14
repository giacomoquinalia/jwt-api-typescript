import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import MESSAGE from '../helpers/constants'
import { config } from 'dotenv'; config()


export default function isAuthenticated(
    req: Request, 
    res: Response, 
    next: NextFunction
): any {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            success: false,
            message: MESSAGE.AUTH.UNAUTHORIZED,
            data: null
        })
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (error, result) => {
        if (error) {
            return res.status(401).json({
                success: false,
                message: error.message,
                data: null,
                errors: error
            })
        }

        return next()
    })
}
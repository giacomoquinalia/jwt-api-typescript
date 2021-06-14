import { Request, Response } from 'express'
import { RefreshTokenUseCase } from './RefreshTokenUseCase'
import { validationResult } from 'express-validator'
import ErrorHandler from '../../../errors/ErrorHandler'
import MESSAGE from '../../../helpers/constants'


export class RefreshTokenController {    
    
    constructor(
        private refreshTokenUseCase: RefreshTokenUseCase
    ) {}

    handle = async (req: Request, res: Response): Promise<Response> => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json(ErrorHandler(errors))
        }

        const { refresh_token } = req.body
        const ip_address = req.ip
        const expires = new Date(Date.now() + 7*24*60*60*1000) // 7 days

        try {     
            const tokens = await this.refreshTokenUseCase.execute({
                refresh_token,
                expires,
                ip_address
            })

            return res.status(201).json({
                success: true,
                message: MESSAGE.TOKENS.REFRESHED,
                data: tokens
            })
        } catch(error) {
            return res.status(400).json(ErrorHandler(error))
        }
    }
}

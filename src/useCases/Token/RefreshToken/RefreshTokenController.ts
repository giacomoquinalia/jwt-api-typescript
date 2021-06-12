import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import ErrorHandler from '../../../errors/ErrorHandler'
import MESSAGE from '../../../helpers/constants'
import { RefreshTokenUseCase } from './RefreshTokenUseCase'


export class RefreshTokenController {    
    
    constructor(
        private refreshTokenUseCase: RefreshTokenUseCase
    ) {}

    handle = async (req: Request, res: Response): Promise<Response> => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json(ErrorHandler(errors))
        }

        const { user_id, refresh_token } = req.body
        const created_by_ip = req.ip
        const expires = new Date(Date.now() + 7*24*60*60*1000) // 7 days

        try {     
            const newRefreshToken = await this.refreshTokenUseCase.execute({
                user_id,
                refresh_token,
                expires,
                created_by_ip
            })

            return res.status(201).json({
                success: true,
                message: MESSAGE.TOKENS.REFRESHED,
                data: newRefreshToken
            })
        } catch(error) {
            return res.status(400).json(ErrorHandler(error))
        }
    }
}

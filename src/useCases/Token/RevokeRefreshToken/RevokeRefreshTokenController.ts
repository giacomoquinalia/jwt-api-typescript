import { Request, Response } from 'express'
import { RevokeRefreshTokenUseCase } from './RevokeRefreshTokenUseCase'
import { validationResult } from 'express-validator'
import ErrorHandler from '../../../errors/ErrorHandler'
import MESSAGE from '../../../helpers/constants'


export class RefreshTokenController {    

    constructor(
        private revokeRefreshTokenUseCase: RevokeRefreshTokenUseCase
    ) {}
    
    handle = async (req: Request, res: Response): Promise<Response> => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json(ErrorHandler(errors))
        }

        const { refresh_token } = req.body
        const ip_address = req.ip

        try {     
            const revokedRefreshToken = await this.revokeRefreshTokenUseCase.execute({
                refresh_token,
                ip_address
            })

            return res.status(201).json({
                success: true,
                message: MESSAGE.TOKENS.REVOKED,
                data: revokedRefreshToken
            })
        } catch(error) {
            return res.status(400).json(ErrorHandler(error))
        }
    }
}

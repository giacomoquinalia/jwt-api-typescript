import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import ErrorHandler from '../../../errors/ErrorHandler'
import MESSAGE from '../../../helpers/constants'
import { RefreshTokenUseCase } from './RefreshTokenUseCase'


export class CreateUserController {    
    
    constructor(
        private refreshTokenUseCase: RefreshTokenUseCase
    ) {}

    handle = async (req: Request, res: Response): Promise<Response> => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json(ErrorHandler(errors))
        }

        const { refresh_token } = req.body

        try {     
            const newRefreshToken = await this.refreshTokenUseCase.execute({
                refresh_token
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

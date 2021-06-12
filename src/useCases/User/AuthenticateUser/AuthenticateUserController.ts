import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import ErrorHandler from '../../../errors/ErrorHandler'
import MESSAGE from '../../../helpers/constants'
import AuthenticateUserUseCase from './AuthenticateUserUseCase'


export default class AuthenticateUserController {
    constructor(
        private AuthenticateUserUseCase: AuthenticateUserUseCase
    ) {}

    handle = async (req: Request, res: Response): Promise<Response> => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
          return res.status(400).json(ErrorHandler(errors))
        }

        const ip_address = req.ip
        const {
            username,
            password
        } = req.body

        try {
            const data = await this.AuthenticateUserUseCase.execute({
                username,
                password,
                ip_address
            })

            return res.status(201).json({
                success: true,
                message: MESSAGE.AUTH.AUTHORIZED,
                data: data
            })
        } catch(error) {
            return res.status(400).json(ErrorHandler(error))
        }
    }
}

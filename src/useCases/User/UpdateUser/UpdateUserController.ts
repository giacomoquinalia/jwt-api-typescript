import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import ErrorHandler from '../../../errors/ErrorHandler'
import MESSAGE from '../../../helpers/constants'
import UpdateUserUseCase from './UpdateUserUseCase'


export default class FindUserController {
    constructor(
        private updateUserUseCase: UpdateUserUseCase
    ) {}

    handle = async (req: Request, res: Response): Promise<Response> => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
          return res.status(400).json(ErrorHandler(errors))
        }

        const { id } = req.params
        const {
            name,
            username,
            password,
            email,
            company
        } = req.body

        try {
            const user = await this.updateUserUseCase.execute({
                name,
                username,
                password,
                email,
                company
            }, id)

            return res.status(201).json({
                success: true,
                message: MESSAGE.USERS.UPDATED,
                data: user
            })
        } catch(error) {
            return res.status(400).json(ErrorHandler(error))
        }
    }
}

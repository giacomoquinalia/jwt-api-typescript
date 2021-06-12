import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import ErrorHandler from '../../../errors/ErrorHandler'
import MESSAGE from '../../../helpers/constants'
import FindUserUseCase from './FindUserUseCase'


export default class FindUserController {
    constructor(
        private findUserUseCase: FindUserUseCase
    ) {}

    handle = async (req: Request, res: Response): Promise<Response> => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
          return res.status(400).json(ErrorHandler(errors))
        }

        const { id } = req.params

        try {
            const user = await this.findUserUseCase.execute({
                id
            })

            return res.status(201).json({
                success: true,
                message: MESSAGE.USERS.FOUND_ONE,
                data: user
            })
        } catch(error) {
            return res.status(400).json(ErrorHandler(error))
        }
    }
}

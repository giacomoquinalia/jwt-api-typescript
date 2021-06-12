import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import ErrorHandler from '../../../errors/ErrorHandler'
import MESSAGE from '../../../helpers/constants'
import DeleteUserUseCase from './DeleteUserUseCase'


export default class DeleteUserController {
    constructor(
        private deleteUserUseCase: DeleteUserUseCase
    ) {}

    handle = async (req: Request, res: Response): Promise<Response> => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
          return res.status(400).json(ErrorHandler(errors))
        }

        const { id } = req.params

        try {
            const user = await this.deleteUserUseCase.execute({
                id
            })

            return res.status(201).json({
                success: true,
                message: MESSAGE.USERS.DELETED,
                data: user
            })
        } catch(error) {
            return res.status(400).json(ErrorHandler(error))
        }
    }
}

import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import ErrorHandler from '../../../errors/ErrorHandler'
import MESSAGE from '../../../helpers/constants'
import { CreateUserUseCase } from './CreateUserUseCase'


export class CreateUserController {    
    
    constructor(
        private createUserUseCase: CreateUserUseCase
    ) {}

    handle = async (req: Request, res: Response): Promise<Response> => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json(ErrorHandler(errors))
        }

        const {
            name,
            password,
            email,
            username,
            company
        } = req.body

        try {     
            const user = await this.createUserUseCase.execute({
                name,
                password,
                email,
                username,
                company
            })
            

            return res.status(201).json({
                success: true,
                message: MESSAGE.USERS.CREATED,
                data: user
            })
        } catch(error) {
            return res.status(400).json(ErrorHandler(error))
        }
    }
}

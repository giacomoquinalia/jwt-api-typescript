import { IUsersRepository } from '../../../repositories/IUserRepository'
import { ICreateUserRequestDTO } from './CreateUserRequestDTO'
import filterUser from '../../../utils/filterUser'
import { v4 } from 'uuid'


export class CreateUserUseCase {
    constructor (
        public usersRepository: IUsersRepository
    ) {}

    async execute({ name, email, username, password, company }: ICreateUserRequestDTO) {
        const userExists = await this.usersRepository.findOne({
            where: [
                { email },
                { username }
            ]
        })

        if (userExists) {
            throw new Error('User already exists')
        }
        

        const newUser = await this.usersRepository.create({
            id: v4(),
            name,
            email,
            username,
            password,
            company
        })
        
        const filteredNewUser = filterUser(newUser)

        return filteredNewUser
    }
}
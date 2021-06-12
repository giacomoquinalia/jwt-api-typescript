import { IUsersRepository } from '../../../repositories/IUserRepository'
import { IDeleteUserRequestDTO } from './DeleteUserRequestDTO'
import filterUser from '../../../utils/filterUser'
import { v4 } from 'uuid'


export default class CreateUserUseCase {
    constructor (
        private usersRepository: IUsersRepository
    ) {}

    async execute({ id }: IDeleteUserRequestDTO) {
        const user = await this.usersRepository.findOne({
            where: {
                id
            }
        })

        if (!user) {
            throw new Error('User does not exists')
        }

        await this.usersRepository.delete(id)
        
        const filteredUser = filterUser(user)

        return filteredUser
    }
}

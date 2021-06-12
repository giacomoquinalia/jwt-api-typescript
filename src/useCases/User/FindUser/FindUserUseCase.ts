import { IUsersRepository } from '../../../repositories/IUserRepository'
import { IFindUserRequestDTO } from './FindUserRequestDTO'
import filterUser from '../../../utils/filterUser'


export default class FindUserUseCase {
    constructor (
        private usersRepository: IUsersRepository
    ) {}

    async execute({ id }: IFindUserRequestDTO) {
        const user = await this.usersRepository.findOne({
            where: {
                id
            }
        })

        if (!user) {
            throw new Error('User does not exists')
        }
        
        const filteredUser = filterUser(user)

        return filteredUser
    }
}

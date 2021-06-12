import { IUsersRepository } from '../../../repositories/IUserRepository'
import { IUpdateUserRequestDTO } from './UpdateUserRequestDTO'
import filterUser from '../../../utils/filterUser'
import filterObject from '../../../utils/filterObject'


export default class UpdateUserUseCase {
    constructor (
        private usersRepository: IUsersRepository
    ) {}

    async execute(newProps: IUpdateUserRequestDTO , id: string) {
        const user = await this.usersRepository.findOne({
            id
        })

        if (!user) {
            throw new Error('User does not exists')
        }

        const filteredNewProps = filterObject(newProps)
        
        let email = newProps.email === undefined ? null : newProps.email
        let username = newProps.username === undefined ? null : newProps.username

        const userAlreadyExists = await this.usersRepository.findOne({
            where: [
                { email },
                { username }
            ]
        })

        if (userAlreadyExists) {
            throw new Error('Another user already exists with the provided information')
        }

        await this.usersRepository.update(id, filteredNewProps)

        const updatedUser = await this.usersRepository.findOne({
            id
        })

        const filteredUser = filterUser(updatedUser)

        return filteredUser
    }
}

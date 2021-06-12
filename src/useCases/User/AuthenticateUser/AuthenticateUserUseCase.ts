import { IUsersRepository } from '../../../repositories/IUserRepository'
import { IAuthenticateUserRequestDTO } from './AuthenticateUserDTO'
import { generateToken, generateRefreshToken } from '../../../utils/token'
import bcrypt from 'bcrypt'
import filterUser from '../../../utils/filterUser'



export default class AuthenticateUserUseCase {
    constructor (
        private usersRepository: IUsersRepository
    ) {}

    async execute({ username, password, ip_address }: IAuthenticateUserRequestDTO) {
        const user = await this.usersRepository.findOne({
            username
        })

        if (!user || !user.is_active || !bcrypt.compareSync(password, user.password)) {
            throw new Error('Incorrect username or password')
        }

        const filteredUser = filterUser(user)

        const token = generateToken(user)

        return {
            user: filteredUser,
            token
        }
    }
}

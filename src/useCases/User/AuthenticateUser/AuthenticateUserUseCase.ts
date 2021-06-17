import { IUsersRepository } from '../../../repositories/IUserRepository'
import { IAuthenticateUserRequestDTO } from './AuthenticateUserDTO'
import { generateToken, generateRefreshToken } from '../../../utils/token'
import bcrypt from 'bcrypt'
import filterUser from '../../../utils/filterUser'
import { v4 } from 'uuid'
import { IRefreshTokensRepository } from '../../../repositories/IRefreshTokenRepository'
import filterRefreshToken from '../../../utils/filterRefreshToken'



export default class AuthenticateUserUseCase {
    constructor (
        private usersRepository: IUsersRepository,
        private refreshTokensRepository: IRefreshTokensRepository
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
        const refreshToken = generateRefreshToken(user.id)

        const newRefreshToken = await this.refreshTokensRepository.create({
            id: v4(),
            user_id: user.id,
            refresh_token: refreshToken,
            expires: new Date(Date.now() + 90*24*60*60*1000),
            created_by_ip: ip_address
        })

        const filteredRefreshToken = filterRefreshToken(newRefreshToken)

        return {
            user: filteredUser,
            token,
            refresh_token: filteredRefreshToken
        }
    }
}

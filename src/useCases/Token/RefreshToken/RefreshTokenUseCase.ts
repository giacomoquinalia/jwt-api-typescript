import { IRefreshTokenRequestDTO } from './RefreshTokenRequestDTO'
import filterRefreshToken from '../../../utils/filterRefreshToken'
import { IRefreshTokensRepository } from '../../../repositories/IRefreshTokenRepository'
import { generateRefreshToken, generateToken } from '../../../utils/token'
import { IUsersRepository } from '../../../repositories/IUserRepository'
import { v4 } from 'uuid'
import filterUser from '../../../utils/filterUser'


export class RefreshTokenUseCase {
    constructor (
        private refreshTokensRepository: IRefreshTokensRepository,
        private usersRepository: IUsersRepository
    ) {}

    async execute({ refresh_token, expires, ip_address }: IRefreshTokenRequestDTO) {
        const refreshToken = await this.refreshTokensRepository.findOne({
            refresh_token
        })

        if (!refreshToken || !refreshToken.isActive) {
            throw new Error('Invalid refresh token')
        }

        const user = await this.usersRepository.findOne({
            id: refreshToken.user_id
        })

        const token = generateToken(user)
        const generatedRefreshToken = generateRefreshToken(user.id)

        const newRefreshToken = await this.refreshTokensRepository.create({
            id: v4(),
            user_id: user.id,
            refresh_token: generatedRefreshToken,
            expires,
            created_by_ip: ip_address
        })

        const filteredRefreshToken = filterRefreshToken(newRefreshToken)
        const filteredUser = filterUser(user)

        return {
            token,
            refresh_token: filteredRefreshToken,
            user: filteredUser
        }
    }
}
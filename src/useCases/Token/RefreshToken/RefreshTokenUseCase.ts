import { IRefreshTokenRequestDTO } from './RefreshTokenRequestDTO'
import { IRefreshTokensRepository } from '../../../repositories/IRefreshTokenRepository'
import { generateRefreshToken, generateToken } from '../../../utils/token'
import { IUsersRepository } from '../../../repositories/IUserRepository'
import { v4 } from 'uuid'
import filterRefreshToken from '../../../utils/filterRefreshToken'
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

        if (!refreshToken) {
            throw new Error('Invalid refresh token')
        }  

        if (refreshToken.revoked) {
            throw new Error('The refresh token was revoked')
        }

        if (refreshToken.isExpired()) {
            await this.refreshTokensRepository.delete(refreshToken.id)

            throw new Error('The refresh token was deleted because it is expired')
        }

        const user = await this.usersRepository.findOne({
            id: refreshToken.user_id
        })

        if (!user.is_active) {
            throw new Error(`User ${user.username} is inactive`)
        }

        const token = generateToken(user)
        const generatedRefreshToken = generateRefreshToken(user.id)

        await this.refreshTokensRepository.update(refreshToken.id, {
            revoked: true,
            revoked_by_ip: ip_address,
            revoked_by_token: generatedRefreshToken
        })

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
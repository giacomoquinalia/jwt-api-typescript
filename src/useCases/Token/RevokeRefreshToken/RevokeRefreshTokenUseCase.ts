import { IRevokeRefreshTokenRequestDTO } from './RevokeRefreshTokenRequestDTO'
import filterRefreshToken from '../../../utils/filterRefreshToken'
import { IRefreshTokensRepository } from '../../../repositories/IRefreshTokenRepository'


export class RevokeRefreshTokenUseCase {
    constructor (
        private refreshTokensRepository: IRefreshTokensRepository
    ) {}

    async execute({ refresh_token, ip_address }: IRevokeRefreshTokenRequestDTO) {
        const refreshToken = await this.refreshTokensRepository.findOne({
            refresh_token
        })

        if (!refreshToken) {
            throw new Error('Invalid refresh token')
        }

        if (refreshToken.revoked) {
            throw new Error('The refresh token is already revoked')
        }

        await this.refreshTokensRepository.update(refreshToken.id, {
            revoked: true,
            revoked_by_ip: ip_address
        })

        const filteredRefreshToken = filterRefreshToken(refreshToken)

        return filteredRefreshToken
    }
}
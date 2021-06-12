import { ITokensRepository } from '../../../repositories/ITokenRepository'
import { IRefreshTokenRequestDTO } from './RefreshTokenRequestDTO'
import filterRefreshToken from '../../../utils/filterRefreshToken'
import { v4 } from 'uuid'


export class RefreshTokenUseCase {
    constructor (
        private tokensRepository: ITokensRepository
    ) {}

    async execute({ user_id, refresh_token, expires, ip_address }: IRefreshTokenRequestDTO) {
        const refreshToken = await this.tokensRepository.findOne({
            refresh_token
        })

        if (!refreshToken || !refreshToken.isActive) {
            throw new Error('Invalid refresh token')
        }
        
        const newRefreshToken = await this.tokensRepository.create({
            id: v4(),
            user_id,
            refresh_token,
            expires,
            created_by_ip: ip_address
        })
        
        const filteredNewRefreshToken = filterRefreshToken(newRefreshToken)

        return filteredNewRefreshToken
    }
}
import { PostgresRefreshTokensRepository } from '../../../repositories/implementations/Postgres/TokensRepository'
import { RefreshTokenUseCase } from './RefreshTokenUseCase'
import { RefreshTokenController } from './RefreshTokenController'



const postgresRefreshTokensRepository = new PostgresRefreshTokensRepository()
const refreshTokenUseCase = new RefreshTokenUseCase(postgresRefreshTokensRepository)
const refreshTokenController = new RefreshTokenController(refreshTokenUseCase)


export {
    refreshTokenUseCase,
    refreshTokenController
}

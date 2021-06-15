import { PostgresRefreshTokensRepository } from '../../../repositories/implementations/Postgres/RefreshTokensRepository'
import { RevokeRefreshTokenUseCase } from './RevokeRefreshTokenUseCase'
import { RevokeRefreshTokenController } from './RevokeRefreshTokenController'



const postgresRefreshTokensRepository = new PostgresRefreshTokensRepository()

const revokeRefreshTokenUseCase = new RevokeRefreshTokenUseCase(
    postgresRefreshTokensRepository
)

const revokeRefreshTokenController = new RevokeRefreshTokenController(revokeRefreshTokenUseCase)


export {
    revokeRefreshTokenUseCase,
    revokeRefreshTokenController
}

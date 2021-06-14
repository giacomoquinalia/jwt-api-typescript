import { PostgresRefreshTokensRepository } from '../../../repositories/implementations/Postgres/RefreshTokensRepository'
import { RefreshTokenUseCase } from './RefreshTokenUseCase'
import { RefreshTokenController } from './RefreshTokenController'
import { PostgresUsersRepository } from '../../../repositories/implementations/Postgres/UsersRepsoritory'



const postgresRefreshTokensRepository = new PostgresRefreshTokensRepository()
const postgresUsersRepository = new PostgresUsersRepository()

const refreshTokenUseCase = new RefreshTokenUseCase(
    postgresRefreshTokensRepository,
    postgresUsersRepository
)

const refreshTokenController = new RefreshTokenController(refreshTokenUseCase)


export {
    refreshTokenUseCase,
    refreshTokenController
}

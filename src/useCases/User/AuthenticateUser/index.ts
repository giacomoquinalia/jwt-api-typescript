import { PostgresUsersRepository } from '../../../repositories/implementations/Postgres/UsersRepsoritory'
import AuthenticateUserUseCase from './AuthenticateUserUseCase'
import AuthenticateUserController from './AuthenticateUserController'
import { PostgresRefreshTokensRepository } from '../../../repositories/implementations/Postgres/RefreshTokensRepository'


const postgresUsersRepository = new PostgresUsersRepository()
const postgresRefreshTokensRepository = new PostgresRefreshTokensRepository()

const authenticateUserUseCase = new AuthenticateUserUseCase(
    postgresUsersRepository,
    postgresRefreshTokensRepository
)
const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase)


export {
    authenticateUserUseCase,
    authenticateUserController
}
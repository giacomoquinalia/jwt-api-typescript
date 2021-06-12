import {PostgresUsersRepository} from '../../../repositories/implementations/Postgres/UsersRepsoritory'
import AuthenticateUserUseCase from './AuthenticateUserUseCase'
import AuthenticateUserController from './AuthenticateUserController'


const postgresUsersRepository = new PostgresUsersRepository()
const authenticateUserUseCase = new AuthenticateUserUseCase(postgresUsersRepository)
const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase)


export {
    authenticateUserUseCase,
    authenticateUserController
}
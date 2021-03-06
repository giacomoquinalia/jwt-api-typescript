import {PostgresUsersRepository} from '../../../repositories/implementations/Postgres/UsersRepsoritory'
import FindUserUseCase from './FindUserUseCase'
import FindUserController from './FindUserController'


const postgresUsersRepository = new PostgresUsersRepository()
const findUserUseCase = new FindUserUseCase(postgresUsersRepository)
const findUserController = new FindUserController(findUserUseCase)


export {
    findUserUseCase,
    findUserController
}
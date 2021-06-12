import {PostgresUsersRepository} from '../../../repositories/implementations/Postgres/UsersRepsoritory'
import UpdateUserUseCase from './UpdateUserUseCase'
import UpdateUserController from './UpdateUserController'


const postgresUsersRepository = new PostgresUsersRepository()
const updateUserUseCase = new UpdateUserUseCase(postgresUsersRepository)
const updateUserController = new UpdateUserController(updateUserUseCase)


export {
    updateUserUseCase,
    updateUserController
}
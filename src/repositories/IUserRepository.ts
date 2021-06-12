import { User } from '../entity/User'
import { ICreateUserRequestDTO } from '../useCases/User/CreateUser/CreateUserRequestDTO';


export interface IUsersRepository {
    findOne(options: object): Promise<User>
    create(user: ICreateUserRequestDTO): Promise<User>
    update(id: string, props :object): Promise<void>
    delete(id: string): Promise<void>
}
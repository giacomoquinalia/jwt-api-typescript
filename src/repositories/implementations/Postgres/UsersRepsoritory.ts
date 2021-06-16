import { getRepository, Repository } from 'typeorm'
import { IUsersRepository } from "../../IUserRepository"
import { User } from '../../../entity/User'
import { ICreateUserRequestDTO } from '../../../useCases/User/CreateUser/CreateUserRequestDTO'


export class PostgresUsersRepository implements IUsersRepository {

    async findOne(options: object): Promise<User> {     
        const repository = getRepository(User)  

        const user = await repository.findOne(options)

        return user!
    }

    async create({ id, name, password, email, username, company }: ICreateUserRequestDTO): Promise<User> {
        const repository = getRepository(User)
 
        const newUser = await repository.create({
            id, 
            name,
            password,
            email,
            username,
            company
        })

        await repository.save(newUser)

        return newUser
    }

    async update(id: string, props: object): Promise<void> {
        const repository = getRepository(User)
 
        await repository.update(id, props)
    }

    async delete(id: string): Promise<void> {
        const repository = getRepository(User)
 
        await repository.delete(id)
    }    
}

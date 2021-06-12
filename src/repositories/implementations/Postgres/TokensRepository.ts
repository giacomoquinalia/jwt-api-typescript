import { getRepository, Repository } from 'typeorm'
import { Token } from '../../../entity/Token'
import { IRefreshTokenRequestDTO } from '../../../useCases/Token/RefreshToken/RefreshTokenRequestDTO'
import { ITokensRepository, IRefreshTokenFindOne } from '../../ITokenRepository'


export class PostgresRefreshTokensRepository implements ITokensRepository {

    async findOne(options: IRefreshTokenFindOne): Promise<Token> {     
        const repository = getRepository(Token)  

        const RefreshToken = await repository.findOne(options)

        return RefreshToken!
    }

    async create({ 
        id, refresh_token, expires, created_by_ip 
    }: IRefreshTokenRequestDTO): Promise<Token> {
        const repository = getRepository(Token)
 
        const newRefreshToken = await repository.create({
            id,
            refresh_token,
            expires,
            created_by_ip
        })

        await repository.save(newRefreshToken)

        return newRefreshToken
    }

    async update(id: string, props: object): Promise<void> {
        const repository = getRepository(Token)
 
        await repository.update(id, props)
    }    
}

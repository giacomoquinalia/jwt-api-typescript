import { getRepository } from 'typeorm'
import { RefreshToken } from '../../../entity/RefreshToken'
import { IRefreshTokenRequestDTO } from '../../../useCases/Token/RefreshToken/RefreshTokenRequestDTO'
import { IRefreshTokensRepository, IRefreshTokenFindOne } from '../../IRefreshTokenRepository'


export class PostgresRefreshTokensRepository implements IRefreshTokensRepository {

    async findOne(options: IRefreshTokenFindOne): Promise<RefreshToken> {     
        const repository = getRepository(RefreshToken)  

        const refreshToken = await repository.findOne(options)

        return refreshToken!
    }

    async create({ 
        id, user_id, refresh_token, expires, created_by_ip 
    }: IRefreshTokenRequestDTO): Promise<RefreshToken> {
        const repository = getRepository(RefreshToken)
 
        const newRefreshToken = await repository.create({
            id,
            user_id,
            refresh_token,
            expires,
            created_by_ip
        })

        await repository.save(newRefreshToken)

        return newRefreshToken
    }

    async update(id: string, props: object): Promise<void> {
        const repository = getRepository(RefreshToken)
 
        await repository.update(id, props)
    }    

    async delete(id: string): Promise<void> {
        const repository = getRepository(RefreshToken)
        
        await repository.delete(id)
    }
}

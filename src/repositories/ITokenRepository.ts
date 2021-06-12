import { Token } from '../entity/Token'
import { IRefreshTokenRequestDTO } from '../useCases/Token/RefreshToken/RefreshTokenRequestDTO';


export interface IRefreshTokenFindOne {
    refresh_token: string
}

export interface ITokensRepository {
    findOne(refresh_token: IRefreshTokenFindOne): Promise<Token>
    create(refresh_token: IRefreshTokenRequestDTO): Promise<Token>
    update(id: string, props: object): Promise<void>
}
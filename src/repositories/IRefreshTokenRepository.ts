import { RefreshToken } from '../entity/RefreshToken'
import { IRefreshTokenRequestDTO } from '../useCases/Token/RefreshToken/RefreshTokenRequestDTO';


export interface IRefreshTokenFindOne {
    refresh_token: string
}

export interface IRefreshTokensRepository {
    findOne(refresh_token: IRefreshTokenFindOne): Promise<RefreshToken>
    create(refresh_token: IRefreshTokenRequestDTO): Promise<RefreshToken>
    update(id: string, props: object): Promise<void>
    delete(id: string): Promise<void>
}
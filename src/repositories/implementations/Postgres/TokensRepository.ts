// import { getRepository } from 'typeorm'
// import { ITokensRepository } from "../../ITokenRepository"
// import { Token } from '../../../entity/Token'
// import { ICreateTokenDTO } from '../../../useCases/CreateToken/CreateTokenDTO'


// export default class PostgresTokensRepository implements ITokensRepository {
//     private repository = getRepository(Token)

//     constructor() {}

//     async create({
//         id,
//         user_id,
//         token, 
//         expires,
//         created_by_ip
//      }: ICreateTokenDTO): Promise<Token> { 
//         const newToken = await this.repository.create({
//             id,
//             userConnection: user_id,
//             token, 
//             expires, 
//             created_by_ip
//         })

//         await this.repository.save(newToken)
        
//         return newToken
//     }
// }
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { ICreateUserRequestDTO } from '../useCases/User/CreateUser/CreateUserRequestDTO'
import { config } from 'dotenv'
config()



export function generateToken({ id, name, email, username }: ICreateUserRequestDTO): string {
    return jwt.sign(
        {
            id,
            name,
            email, 
            username
        },
        process.env.TOKEN_SECRET!,
        { expiresIn: '60m' } // 1 hour | 60 minutes
    )
}

export function generateRefreshToken(user_id: string): string {
    return crypto.randomBytes(40).toString('hex')
}


// export async function manageRefreshTokens(user_id: string): Promise<void> {
//     const [tokens, count] = await tokensRepository.findAndCount({
//         userConnection: user_id
//     })

//     if (count >= 25) {
//         await tokensRepository.remove(tokens)
//     }
// }
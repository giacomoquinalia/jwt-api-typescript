import { body, param } from 'express-validator'


export default function validateRequest(method: string): any {
    switch(method) {
        case 'refreshToken':
            return [
                body('refresh_token', 'Parameter required: refresh_token -> string').isString()
            ]
        case 'revokeToken':
            return [
                body('refresh_token', 'Parameter required: refresh_token -> string').isString()
            ]
    }
}
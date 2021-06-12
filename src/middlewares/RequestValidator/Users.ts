import { body, param } from 'express-validator'


export default function validateRequest(method: string): any {
    switch(method) {
        case 'findById':
            return [
                param('id', 'Parameter required: id -> UUIDv4').isUUID()
            ]
        case 'authenticate':
            return [
                body('username', 'Parameter required: username -> string').isString(),
                body('password', 'Parameter required: password -> string').isString()
            ]
        case 'create':
            return [
                body('name',     'Parameter required: name -> string').isString(),
                body('email',    'Parameter required: email -> string').isEmail(),
                body('username', 'Parameter required: username -> string').isString(),
                body('password', 'Parameter required: password -> string').isString(),
                body('company',  'Parameter required: password -> string').isString()
            ]
        case 'update':
            return [
                param('id', 'Parameter required: id -> UUIDv4').isUUID()
            ]
        case 'delete':
            return [
                param('id', 'Parameter required: id -> UUIDv4').isUUID()
            ]
    }
}
import { Router } from 'express'

const TokenRoutes = Router()

TokenRoutes
    .post('/')
    .post('/refresh')
    .delete('/revoke')


export default TokenRoutes
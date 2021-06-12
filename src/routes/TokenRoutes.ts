import { Router } from 'express'
import isAuthenticated from '../middlewares/JWTAuthentication'
import validate from '../middlewares/RequestValidator/Tokens'
import { refreshTokenController } from '../useCases/Token/RefreshTokenController'
import { revokeTokenController } from '../useCases/Token/revokeTokenController'

const TokenRoutes = Router()

TokenRoutes
    .post(
        '/refresh',
        isAuthenticated,
        validate('refreshToken')
    )
    .put(
        '/revoke',
        isAuthenticated,
        validate('revokeRefreshToken')
    )


export default TokenRoutes